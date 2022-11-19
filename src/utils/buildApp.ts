import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import validatorOptions from '../../config/validatorOptions'

export default async Module => {
    const app = await NestFactory.create<NestFastifyApplication>(
        Module,
        new FastifyAdapter(),
    )

    app.register(import('@fastify/multipart'))
    app.useGlobalPipes(new ValidationPipe(validatorOptions))

    return app
}
