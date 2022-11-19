import { AppModule } from './app.module'
import buildApp from './utils/buildApp'

async function bootstrap() {
    const app = await buildApp(AppModule)

    await app.listen(+process.env.PORT, '0.0.0.0')
    console.log(`Listening on http://localhost:${process.env.PORT}`)
}
bootstrap()
