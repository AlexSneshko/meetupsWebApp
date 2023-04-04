export const checkMinLength =
    (minLength: number) =>
    (value: string): boolean =>
        value.length <= minLength

export const checkMaxLength =
    (maxLength: number) =>
    (value: string): boolean =>
        value.length > maxLength

export const checkRegExp =
    (regExp: RegExp) =>
    (value: string): boolean =>
        !regExp.test(value)
