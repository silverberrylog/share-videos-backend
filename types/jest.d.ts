// eslint-disable-next-line
import type { MatcherFunction } from 'expect'

declare module 'expect' {
    interface AsymmetricMatchers {
        toMatchSchema(schema: ClassConstructor<unknown>): void
    }
    interface Matchers<R> {
        toMatchSchema(schema: ClassConstructor<unknown>): R
    }
}
