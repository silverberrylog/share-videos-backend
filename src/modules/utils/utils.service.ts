import {
    INestApplication,
    Injectable,
    OnModuleInit,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaClient } from '@prisma/client'
import { FastifyRequest } from 'fastify'
import { plainToInstance } from 'class-transformer'
import { VideoDto } from '../videos/videos.dto'

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
            req.body[key] = plainToInstance(VideoDto, videoPlainObj)
        }

        return next.handle()
    }
}

@Injectable()
export class IsMultipart implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest() as FastifyRequest

        const reqIsMultipart = req.headers['content-type'].includes(
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
