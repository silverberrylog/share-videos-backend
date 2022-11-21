import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import buildApp from './utils/buildApp'
import getVersion from './utils/getVersion'

async function bootstrap() {
    const app = await buildApp(AppModule)

    const docsConfig = new DocumentBuilder()
        .setTitle('share-videos docs')
        .setDescription(
            'The api documentation for the share-videos application',
        )
        .setVersion(getVersion())
        .build()
    const docsDocument = SwaggerModule.createDocument(app, docsConfig)
    SwaggerModule.setup('docs', app, docsDocument)

    await app.listen(+process.env.PORT, '0.0.0.0')

    const baseUrl = await app.getUrl()
    console.log(`API is running on ${baseUrl}`)
    console.log(`Docs are visible on ${baseUrl}/docs`)
}
bootstrap()
