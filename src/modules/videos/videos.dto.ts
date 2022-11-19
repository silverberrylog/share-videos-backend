import { IsString, Equals, IsInstance } from 'class-validator'
import { Readable } from 'stream'

export class VideoDto {
    @IsString() @Equals('video') type: string
    @IsString() extension: string
    @IsInstance(Readable) file: Readable
}

export class PostVideoDto {
    @IsString() title: string
    @IsInstance(VideoDto, { message: 'video must exist' }) video: VideoDto
}

export class PostVideoResponseDto {
    @IsString() postedVideoUrl: string
}
