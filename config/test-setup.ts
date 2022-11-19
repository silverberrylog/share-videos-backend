import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import type { MatcherFunction } from 'expect'
import validatorOptions from './validatorOptions'

console.log('='.repeat(50))

const toMatchSchema: MatcherFunction<[schema: ClassConstructor<unknown>]> =
    function (actual, schema) {
        const errors = validateSync(
            plainToInstance(schema as any, actual),
            validatorOptions,
        )

        const _actual = this.utils.printReceived(actual)
        const _expected = this.utils.printExpected(schema)

        if (errors.length === 0) {
            return {
                message: () =>
                    `expected ${_actual} not to match schema ${_expected}`,
                pass: true,
            }
        }

        return {
            message: () => `expected ${_actual} to match schema ${_expected}`,
            pass: false,
        }
    }

expect.extend({ toMatchSchema })
