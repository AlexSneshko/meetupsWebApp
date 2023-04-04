import React, { useState } from 'react'
import styles from './TextArea.module.scss'
import classNames from 'classnames'

export interface TextAreaProps {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    onBlur?: () => void
    name?: string
    maxLength?: number
    helpText?: string
    status?: 'success' | 'invalid' | 'default'
    initialValue?: string
    className?: string
}

export const TextArea = ({
    name,
    maxLength,
    onChange,
    onBlur,
    helpText,
    status,
    className,
    initialValue
}: TextAreaProps): JSX.Element => {
    const [inputText, setInputText] = useState(initialValue || '')

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value.slice(0, maxLength))
        onChange(event)
    }

    const textAreaClass: string = classNames(styles.textArea, className, {
        [styles.invalid]: status === 'invalid',
        [styles.success]: status === 'success'
    })

    const additionalTextClass: string = classNames(styles.text, {
        [styles.invalid]: status === 'invalid',
        [styles.success]: status === 'success'
    })

    return (
        <div className={styles.textAreaContainer}>
            <div className={styles.info}>
                <span className={styles.inputName}>{name}</span>
                {maxLength && (
                    <div>
                        <span className={styles.inputCount}>{inputText.length}</span>
                        <span className={styles.inputMax}>/{maxLength}</span>
                    </div>
                )}
            </div>
            <textarea value={inputText} className={textAreaClass} onChange={handleTextChange} onBlur={onBlur} />
            {helpText && <span className={additionalTextClass}>{helpText}</span>}
        </div>
    )
}
