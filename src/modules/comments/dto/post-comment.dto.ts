import { IsString, IsUUID } from 'class-validator'

export class PostCommentBodyDto {
    /**
     * @example 'dfb1d5dc-2d20-467b-8a15-b4786135567a'
     */
    @IsString() @IsUUID() videoId: string

    /**
     * @example 'Love the video! Keep it up!!'
     */
    @IsString() commentText: string

    /**
     * @example 'John Doe'
     */
    @IsString() commenterName: string
}
