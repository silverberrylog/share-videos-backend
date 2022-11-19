import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { PostVideoResponseDto } from './videos.dto'
import { VideosModule } from './videos.module'
import { expect } from '@jest/globals'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import * as formAutoContent from 'form-auto-content'
import { faker } from '@faker-js/faker'
import { ErrorDto } from '../../utils/error.dto'
import buildApp from '../../utils/buildApp'

describe('Testing videos module', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        app = await buildApp(VideosModule)

        await app.init()
        await app.getHttpAdapter().getInstance().ready()
    })

    describe('Posting videos function', () => {
        it('Should post a video', async () => {
            const pathToVideo = resolve('test/sample-files/video1.mp4')
            const formData = formAutoContent({
                title: faker.lorem.sentence(5),
                video: createReadStream(pathToVideo),
            })

            const res = await app.inject({
                method: 'POST',
                url: '/videos',
                ...formData,
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(200)
            expect(res.json()).toMatchSchema(PostVideoResponseDto)
        })

        it('Should not post a video if the video field is empty but the content type is multipart/form-data', async () => {
            const pathToVideo = resolve('test/sample-files/video1.mp4')
            const formData = formAutoContent({
                title: faker.lorem.sentence(5),
                foo: createReadStream(pathToVideo),
            })

            const res = await app.inject({
                method: 'POST',
                url: '/videos',
                ...formData,
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(400)
            expect(res.json()).toMatchSchema(ErrorDto)
        })

        it('Should not post a video if the video field is empty and the content type is not multipart/form-data', async () => {
            const formData = formAutoContent({
                title: faker.lorem.sentence(5),
            })

            const res = await app.inject({
                method: 'POST',
                url: '/videos',
                ...formData,
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(400)
            expect(res.json()).toMatchSchema(ErrorDto)
        })
    })
})
