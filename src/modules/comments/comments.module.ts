import { Module } from '@nestjs/common'
import { UtilsModule } from '../utils/utils.module'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
    imports: [UtilsModule],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [],
})
export class CommentsModule {}
