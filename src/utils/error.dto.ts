import { IsNumber, IsString } from 'class-validator'

export class ErrorDto {
    @IsNumber() statusCode: number
    @IsString({ each: true }) message: string[]
    @IsString() error: 'Bad Request'
}
