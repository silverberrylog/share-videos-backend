import { VideoDto } from 'src/modules/videos/videos.dto'

declare module 'fastify' {
    interface FastifyRequest {
        rawFiles: { [key: string]: VideoDto }
    }
}
