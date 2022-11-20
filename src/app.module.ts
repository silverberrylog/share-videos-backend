import { Module } from '@nestjs/common'
import { CommentsModule } from './modules/comments/comments.module'
import { VideosModule } from './modules/videos/videos.module'

@Module({
    imports: [VideosModule, CommentsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
