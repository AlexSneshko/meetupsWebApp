import React, { useEffect, useRef, useState } from 'react'
import styles from './DateInput.module.scss'
import { ReactComponent as CalendarImg } from '../../../assets/icons/calendar-icon.svg'
import { LabeledInput } from '../labeledInput/LabeledInput'
import { DatePicker } from './datePicker/DatePicker'
import classNames from 'classnames'
import { getStringDate } from '../../../core/utils/dateString'

export type Day = {
    number: number
    isCurrentMoth: boolean
}

export interface DateInputProps {
    id: string
    value: string
    setValue: (newDate: string) => void
    onBlur?: () => void
    status?: 'success' | 'invalid' | 'default'
    className?: string
    label: string
    helpText?: string
}

export const DateInput = (props: DateInputProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dateInput = useRef<HTMLDivElement>(null)

    const inputClass = classNames(props.className, styles.input)

    const onDatePick = (date: Date) => props.setValue(date.toString())

    const setOnClickOutside = (): (() => void) => {
        const onClick = (event: Event) => {
            return dateInput?.current?.contains(event?.target as Node) || setIsOpen(false)
        }
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }

    useEffect(() => {
        setOnClickOutside()
    }, [])

    return (
        <div className={styles.dateInput}>
            <div ref={dateInput}>
                <div className={styles.inputWrapper}>
                    <LabeledInput
                        onChange={props.setValue}
                        onClick={() => setIsOpen(!isOpen)}
                        onBlur={props.onBlur}
                        value={getStringDate(new Date(props.value))}
                        className={inputClass}
                        status={props.status}
                        label={props.label}
                        helpText={props.helpText}
                    />
                    <CalendarImg className={styles.calendarImg} />
                </div>
                <DatePicker className={isOpen ? styles.visible : styles.invisible} onDatePick={onDatePick} id={props.id} />
            </div>
        </div>
    )
}
