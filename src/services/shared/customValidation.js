import {helpers} from 'vuelidate/lib/validators'

export const alphaWithSpaceDot = helpers.regex('alphaWithSpaceDot', /^[a-zA-Z .]*$/)
export const alphaWithSpace = helpers.regex('alphaWithSpace', /^[a-zA-Z ]*$/)
export const alphaWithDot = helpers.regex('alphaWithDot', /^[a-zA-Z.]*$/)
export const alphaNumericWithSpaceDot = helpers.regex('alphaNumericWithSpaceDot', /([a-zA-Z0-9 .]+)$/)
export const alphaNumericWithSpaceHyphen = helpers.regex('alphaNumericWithSpaceHyphen', /([a-zA-Z0-9 .-]+)$/)
export const alphaNumericWithSpace = helpers.regex('alphaNumericWithSpace', /([a-zA-Z0-9 ]+)$/)
export const alphaNumericWithDot = helpers.regex('alphaNumericWithDot', /([a-zA-Z0-9.]+)$/)