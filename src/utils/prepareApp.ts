import { ValidationPipe } from '@nestjs/common'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import validatorOptions from '../../config/validatorOptions'

export default (app: NestFastifyApplication) => {
    app.register(import('@fastify/multipart'))
    app.useGlobalPipes(new ValidationPipe(validatorOptions))
}
