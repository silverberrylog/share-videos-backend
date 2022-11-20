import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { expect } from '@jest/globals'
import { faker } from '@faker-js/faker'
import { ErrorDto } from '../../utils/error.dto'
import buildApp from '../../utils/buildApp'
import { getVideoPublicId, postVideo } from '../../utils/test-utils'
import { AppModule } from '../../app.module'

describe('Testing the comments module', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        app = await buildApp(AppModule)

        await app.init()
        await app.getHttpAdapter().getInstance().ready()
    })

    describe('Posting comments function', () => {
        it('Should post a comment', async () => {
            const videoId = getVideoPublicId(await postVideo(app))

            const res = await app.inject({
                method: 'POST',
                url: '/comments',
                payload: {
                    videoId,
                    commentText: faker.lorem.sentence(),
                    commenterName: faker.name.fullName(),
                },
            })

            console.log(res.statusCode, res.payload)
            expect(res.statusCode).toEqual(201)
            expect(res.payload).toEqual('')
        })

        it('Should not post a comment when the videoId is missing', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/comments',
                payload: {
                    commentText: faker.lorem.sentence(),
                    commenterName: faker.name.fullName(),
                },
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(400)
            expect(res.json()).toMatchSchema(ErrorDto)
        })

        it('Should not post a comment when the videoId is invalid', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/comments',
                payload: {
                    videoId: faker.datatype.uuid(),
                    commentText: faker.lorem.sentence(),
                    commenterName: faker.name.fullName(),
                },
            })

            console.log(res.statusCode, res.json())
            expect(res.statusCode).toEqual(404)
            expect(res.json()).toMatchSchema(ErrorDto)
        })
    })
})
