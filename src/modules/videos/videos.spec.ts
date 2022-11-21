import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { VideosModule } from './videos.module'
import { expect } from '@jest/globals'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { faker } from '@faker-js/faker'
import { ErrorDto } from '../../utils/error.dto'
import buildApp from '../../utils/buildApp'
import { postVideo } from '../../utils/test-utils'
import { PostVideoResponseDto } from './dto/post-video.dto'

describe('Testing the videos module', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        app = await buildApp(VideosModule)

        await app.init()
        await app.getHttpAdapter().getInstance().ready()
    })

    describe('Posting videos function', () => {
        it('Should post a video', async () => {
            const res = await postVideo(app)

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(200)
            expect(res.json()).toMatchSchema(PostVideoResponseDto)
        })

        it('Should not post a video if the video field is empty but the content type is multipart/form-data', async () => {
            const pathToVideo = resolve('test/sample-files/video1.mp4')
            const res = await postVideo(app, {
                title: faker.lorem.sentence(5),
                foo: createReadStream(pathToVideo),
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(400)
            expect(res.json()).toMatchSchema(ErrorDto)
        })

        it('Should not post a video if the video field is empty and the content type is not multipart/form-data', async () => {
            const res = await postVideo(app, {
                title: faker.lorem.sentence(5),
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(400)
            expect(res.json()).toMatchSchema(ErrorDto)
        })
    })
})
