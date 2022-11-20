import { faker } from '@faker-js/faker'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import * as formAutoContent from 'form-auto-content'
import { createReadStream, ReadStream } from 'fs'
import { resolve } from 'path'
import LightMyRequest from 'light-my-request'

export const postVideo = async (
    app: NestFastifyApplication,
    formDataOverride?: { [key: string]: string | ReadStream },
) => {
    const pathToVideo = resolve('test/sample-files/video1.mp4')
    const formData =
        formDataOverride ||
        formAutoContent({
            title: faker.lorem.sentence(5),
            video: createReadStream(pathToVideo),
        })

    const res = await app.inject({
        method: 'POST',
        url: '/videos',
        ...formData,
    })

    return res
}

export const getVideoPublicId = (res: LightMyRequest.Response) => {
    console.log(res.json())
    return res.json().postedVideoUrl.split('/').pop()
}
