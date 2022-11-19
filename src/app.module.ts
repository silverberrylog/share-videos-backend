import { Module } from '@nestjs/common'
import { VideosModule } from './modules/videos/videos.module'

@Module({
    imports: [VideosModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
