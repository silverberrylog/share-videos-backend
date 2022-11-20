import { Injectable } from '@nestjs/common'
import { PrismaService } from '../utils/utils.service'

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async postComment(
        videoPublicId: string,
        commenterName: string,
        commentText: string,
    ) {
        const { id: videoId } = await this.prisma.videos.findFirst({
            where: { publicId: videoPublicId },
        })

        await this.prisma.comments.create({
            data: { text: commentText, commenterName, videoId },
        })
    }
}
