import { Injectable } from '@nestjs/common'
import { createWriteStream } from 'fs'
import { join, resolve } from 'path'
import { v4 as genUUID } from 'uuid'
import { promises as stream } from 'stream'
import { PrismaService } from '../utils/utils.service'
import { Video } from './entities/video.entity'

const uploadPath = resolve(process.env.VIDEOS_PATH)

@Injectable()
export class VideosService {
    constructor(private prisma: PrismaService) {}

    async postVideo(title: string, video: Video) {
        const videoFileName = `${genUUID()}.${video.extension}`
        const videoFilePath = join(uploadPath, videoFileName)

        await stream.pipeline(video.file, createWriteStream(videoFilePath))

        const { publicId } = await this.prisma.videos.create({
            data: { title, videoFileName },
        })

        return {
            postedVideoUrl: process.env.WATCH_VIDEO_URL + publicId,
        }
    }
}
