import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInstance } from 'class-validator'
import { Video } from '../entities/video.entity'

export class PostVideoBodyDto {
    /**
     * @example 'How to bake the perfect cake'
     */
    @IsString() title: string

    @ApiProperty({ type: 'file' })
    @IsInstance(Video, { message: 'video must exist' })
    video: Video
}

export class PostVideoResponseDto {
    /**
     * @example 'http://example.com/watch-video/dfb1d5dc-2d20-467b-8a15-b4786135567a'
     */
    @IsString() postedVideoUrl: string
}
