import {
    Body,
    Controller,
    Post,
    Req,
    UseInterceptors,
    HttpCode,
} from '@nestjs/common'
import { VideosService } from './videos.service'
import { FastifyRequest } from 'fastify'
import { IsMultipart, PlaceFilesOnBody } from '../utils/utils.service'
import { ApiOkResponse, ApiTags, ApiConsumes } from '@nestjs/swagger'
import { PostVideoBodyDto, PostVideoResponseDto } from './dto/post-video.dto'

@ApiTags('videos')
@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) {}

    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({
        description: 'The video was posted successfully',
    })
    @Post()
    @HttpCode(200)
    @UseInterceptors(IsMultipart, PlaceFilesOnBody)
    async postVideo(
        @Body() body: PostVideoBodyDto,
        @Req() req: FastifyRequest,
    ): Promise<PostVideoResponseDto> {
        const data = await this.videosService.postVideo(
            body.title,
            req.rawFiles.video,
        )

        return data
    }
}
