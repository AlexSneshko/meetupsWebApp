import { useState, useEffect } from 'react'

type Status = 'success' | 'invalid' | 'default'

type Options<T> = {
    [K in keyof T]: (value: string) => boolean
}

type ErrorMessages<T> = {
    [K in keyof T]: string
}

type SuccessMessage = string

interface Input {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    setIsOnBlur: React.Dispatch<React.SetStateAction<boolean>>
    status: Status
    message: string
}

export const useInput = <T>(
    validationOptions: Options<T>,
    errorMessages?: Partial<ErrorMessages<T>>,
    successMessage?: SuccessMessage
): Input => {
    type Option = keyof Options<T>

    const [value, setValue] = useState<string>('')
    const [isOnBlur, setIsOnBlur] = useState<boolean>(false)
    const [status, setStatus] = useState<Status>('default')
    const [message, setMessage] = useState<string>('')

    const getSuccessMessage = (): string => successMessage || ''
    const getErrorMessage = (option: Option): string => (errorMessages ? errorMessages[option] || '' : '')

    const getErrorOption = (validationOptions: Options<T>, value: string): Option | null => {
        for (const option in validationOptions) {
            if (validationOptions[option](value)) {
                return option
            }
        }
        return null
    }

    const getInputStatus = (isOnBlur: boolean, isValid: boolean): Status => {
        if (isOnBlur) {
            return isValid ? 'success' : 'invalid'
        }
        return 'default'
    }

    const getInputMessage = (message: string, isOnBlur: boolean): string => (isOnBlur ? message : '')

    const setInputState = () => {
        const errorOption = getErrorOption(validationOptions, value)
        const isValid = errorOption === null
        const inputStatus = getInputStatus(isOnBlur, isValid)
        const message = isValid ? getSuccessMessage() : getErrorMessage(errorOption)
        const inputMessage = getInputMessage(message, isOnBlur)

        setStatus(inputStatus)
        setMessage(inputMessage)
    }

    useEffect(setInputState, [value, isOnBlur])

    return {
        value,
        setValue,
        setIsOnBlur,
        status,
        message
    }
}
