import classNames from 'classnames'
import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    text: string
    type: 'primary' | 'secondary' | 'default'
    className?: string
    disabled?: boolean
    callback: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({ text, type, disabled, callback, className }: ButtonProps) {
    const buttonClass = classNames(styles.button, styles[type], className)

    return (
        <button onClick={(event) => callback(event)} className={buttonClass} disabled={disabled}>
            {text}
        </button>
    )
}
