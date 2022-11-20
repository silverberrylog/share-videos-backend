import {
    Body,
    Controller,
    Post,
    Req,
    UseInterceptors,
    HttpCode,
} from '@nestjs/common'
import { PostVideoDto } from './videos.dto'
import { VideosService } from './videos.service'
import { FastifyRequest } from 'fastify'
import { IsMultipart, PlaceFilesOnBody } from '../utils/utils.service'

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) {}

    @Post()
    @HttpCode(200)
    @UseInterceptors(IsMultipart, PlaceFilesOnBody)
    async postVideo(@Body() body: PostVideoDto, @Req() req: FastifyRequest) {
        const data = await this.videosService.postVideo(
            body.title,
            req.rawFiles.video,
        )

        return data
    }
}
