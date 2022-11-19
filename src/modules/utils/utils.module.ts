import { Module } from '@nestjs/common'
import { IsMultipart, PrismaService } from './utils.service'

@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService, IsMultipart],
    exports: [PrismaService, IsMultipart],
})
export class UtilsModule {}
