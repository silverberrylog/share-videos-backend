import { Equals, IsInstance, IsString } from 'class-validator'
import { Readable } from 'stream'

export class Video {
    /**
     * @example video
     */
    @IsString() @Equals('video') type: string

    /**
     * @examples mp4
     */
    @IsString() extension: string

    @IsInstance(Readable) file: Readable
}
