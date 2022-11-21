import {
    INestApplication,
    Injectable,
    OnModuleInit,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
    CanActivate,
    NotFoundException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaClient } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { plainToInstance } from 'class-transformer'
import { Reflector } from '@nestjs/core'
import { Video } from '../videos/entities/video.entity'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close()
        })
    }
}

@Injectable()
export class PlaceFilesOnBody implements NestInterceptor {
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest() as FastifyRequest
        const data = await req.file()
        if (!data) {
            throw new BadRequestException(['video must be a file'])
        }

        const { fields } = data
        req.body = {}
        req.rawFiles = {}
        for (const key in fields) {
            if ((fields[key] as any).mimetype === 'text/plain') {
                req.body[key] = (fields[key] as any).value
                continue
            }

            const [type, extension] = (fields[key] as any).mimetype.split('/')
            const { file } = fields[key] as any
            const videoPlainObj = { type, extension, file }

            req.rawFiles[key] = videoPlainObj
            req.body[key] = plainToInstance(Video, videoPlainObj)
        }

        return next.handle()
    }
}

@Injectable()
export class IsMultipart implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest() as FastifyRequest

        const reqIsMultipart = req.headers['content-type']?.includes(
            'multipart/form-data',
        )
        if (!reqIsMultipart) {
            throw new BadRequestException([
                'the content-type header must be multipart/form-data',
            ])
        }

        return next.handle()
    }
}

@Injectable()
export class VideoExistsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const videoPublicIdLocation = this.reflector.get<string[]>(
            'videoPublicIdLocation',
            context.getHandler(),
        )
        if (
            !videoPublicIdLocation ||
            !Array.isArray(videoPublicIdLocation) ||
            videoPublicIdLocation.length < 2
        )
            throw new Error(
                'You must provide an array as videoPublicIdLocation metadata\n' +
                    '\n' +
                    "Example: @SetMetadata('videoPublicIdLocation', ['body', 'publicId'])",
            )

        const req = context.switchToHttp().getRequest() as FastifyRequest
        const videoPublicId =
            req[videoPublicIdLocation[0]][videoPublicIdLocation[1]]
        if (!videoPublicId)
            throw new BadRequestException(['videoId cannot be undefined'])

        const countWithPublicId = await this.prisma.videos.count({
            where: { publicId: videoPublicId },
        })
        if (countWithPublicId === 0)
            throw new NotFoundException([
                'there is no video with the specified id',
            ])

        return true
    }
}
