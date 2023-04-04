import { Input, InputProps } from '../input/Input'
import styles from './LabeledInput.module.scss'
import classNames from 'classnames'
import React from 'react'

interface LabeledInputProps extends InputProps {
    label: string
    helpText?: string
}

export const LabeledInput = (props: LabeledInputProps): JSX.Element => {
    const additionalTextClass: string = classNames(styles.text, {
        [styles.invalid]: props.status === 'invalid',
        [styles.success]: props.status === 'success'
    })

    

    return (
        <div className={styles.inputGroup}>
            <label className={styles.label}>{props.label}</label>

            <Input
                onClick={props.onClick}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
                status={props.status}
                disabled={props.disabled}
                type={props.type}
                initialValue={props.initialValue}
                className={props.className}
                readonly={props.readonly}
                value={props.value}
                name={props.name}
            />

            {props.helpText && <span className={additionalTextClass}>{props.helpText}</span>}
        </div>
    )
}
