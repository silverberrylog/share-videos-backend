import { Body, Controller, Post, UseGuards, SetMetadata } from '@nestjs/common'
import { VideoExistsGuard } from '../utils/utils.service'
import { PostCommentDto } from './comments.dto'
import { CommentsService } from './comments.service'

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @SetMetadata('videoPublicIdLocation', ['body', 'videoId'])
    @UseGuards(VideoExistsGuard)
    async postComment(@Body() body: PostCommentDto) {
        await this.commentsService.postComment(
            body.videoId,
            body.commenterName,
            body.commentText,
        )
    }
}
