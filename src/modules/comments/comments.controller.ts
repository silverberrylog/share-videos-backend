import { Body, Controller, Post, UseGuards, SetMetadata } from '@nestjs/common'
import {
    ApiNotFoundResponse,
    ApiCreatedResponse,
    ApiTags,
} from '@nestjs/swagger'
import { VideoExistsGuard } from '../utils/utils.service'
import { PostCommentBodyDto } from './dto/post-comment.dto'
import { CommentsService } from './comments.service'

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiCreatedResponse({
        description: 'The comment was posted successfully',
    })
    @ApiNotFoundResponse({
        description: 'There is no video with the specified id',
    })
    @Post()
    @SetMetadata('videoPublicIdLocation', ['body', 'videoId'])
    @UseGuards(VideoExistsGuard)
    async postComment(@Body() body: PostCommentBodyDto): Promise<void> {
        await this.commentsService.postComment(
            body.videoId,
            body.commenterName,
            body.commentText,
        )
    }
}
