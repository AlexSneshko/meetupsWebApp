import React from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

export interface InputProps {
    onChange: (newValue: string) => void
    onClick?: () => void
    onFocus?: () => void
    onBlur?: () => void
    type?: 'text' | 'password' | 'email' | 'number'
    initialValue?: string
    value?: string
    disabled?: boolean
    status?: 'success' | 'invalid' | 'default'
    placeholder?: string
    className?: string
    readonly?: boolean
    name?: string
}

export const Input = (props: InputProps): JSX.Element => {
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(event.currentTarget.value)
    }

    const inputClass: string = classNames(styles.input, props.className, {
        [styles.invalid]: props.status === 'invalid',
        [styles.success]: props.status === 'success'
    })

    return (
        <input
            value={props.value}
            className={inputClass}
            type={props.type || 'text'}
            defaultValue={props.initialValue}
            onChange={inputChangeHandler}
            onClick={props.onClick}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            disabled={props.disabled}
            placeholder={props.placeholder}
            readOnly={props.readonly}
            name={props.name}
        />
    )
}
