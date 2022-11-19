import { Module } from '@nestjs/common'
import { UtilsModule } from '../utils/utils.module'
import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'

@Module({
    imports: [UtilsModule],
    controllers: [VideosController],
    providers: [VideosService],
    exports: [],
})
export class VideosModule {}
