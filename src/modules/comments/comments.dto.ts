import { IsString } from 'class-validator'

export class PostCommentDto {
    @IsString() videoId: string
    @IsString() commentText: string
    @IsString() commenterName: string
}
