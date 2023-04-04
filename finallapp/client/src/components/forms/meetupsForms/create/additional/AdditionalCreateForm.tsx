import React, { useEffect, useState } from 'react'
import styles from './AdditionalCreateForm.module.scss'
import { LabeledInput } from '../../../../ui/labeledInput/LabeledInput'
import { DateInput } from '../../../../ui/dateInput/DateInput'
import { ImageLoader } from '../../../../ui/imageLoader/ImageLoader'
import { Meetup } from '../../../../../core/types/Meetup'
import { useInput } from '../../../../../core/hooks/useInput'
import { checkDateValidity, checkDatesValidity } from '../../../../../core/utils/checkDateValidity'
import { MONTH_NAMES } from '../../../../../core/constants/dateTimeConstants'
import Button from '../../../../ui/button/Button'
import { useTranslation } from 'react-i18next'

export type FormAdditionalData = Pick<Meetup, 'start' | 'finish' | 'place' | 'image'>

interface AdditionalCreateFormProps {
    onSubmit: (data: FormAdditionalData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onCancel: () => void
}

const validationOptions = {
    validDate: checkDateValidity
}

const errorMessages = {
    validDate: 'Неверный формат даты'
}

export const AdditionalCreateForm = (props: AdditionalCreateFormProps): JSX.Element => {
    const { t } = useTranslation()

    const start = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const finish = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const [place, setPlace] = useState<string>('')
    const [image, setImage] = useState<string | null>('')
    const [isValidDates, setIsValidDates] = useState<boolean>(false)

    const checkForm = () => [start, finish].every((input) => input.status !== 'invalid') && isValidDates

    const DateToISOString = (date: string) => {
        const [day, month, year, time] = date.split(' ')
        const [hours, minutes] = time.split(':')
        const monthNumber = MONTH_NAMES.indexOf(month)
        return new Date(Number(year), monthNumber, Number(day) + 1, Number(hours), Number(minutes)).toUTCString()
    }

    const getData = (): FormAdditionalData => {
        return {
            start: start.value !== '' ? DateToISOString(start.value) : '',
            finish: finish.value !== '' ? DateToISOString(finish.value) : '',
            place,
            image
        }
    }

    const submitForm = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onSubmit(getData(), event)
    }

    useEffect(() => {
        checkDatesValidity(start.value, finish.value) ? setIsValidDates(true) : setIsValidDates(false)
    }, [start.value, finish.value])

    return (
        <form className={styles.form}>
            <div className={styles.inputs}>
                <div className={styles.dateInputs}>
                    <DateInput
                        id="start"
                        value={start.value}
                        setValue={start.setValue}
                        onBlur={() => start.setIsOnBlur(true)}
                        className={styles.dateInput}
                        status={isValidDates ? start.status : 'invalid'}
                        label={t('start')}
                        helpText={isValidDates ? start.message : 'Дата начала не может быть позже даты окончания'}
                    />
                    <DateInput
                        id="finish"
                        value={finish.value}
                        setValue={finish.setValue}
                        onBlur={() => finish.setIsOnBlur(true)}
                        className={styles.dateInput}
                        status={isValidDates ? finish.status : 'invalid'}
                        label={t('ending')}
                        helpText={isValidDates ? finish.message : 'Дата окончания не может быть раньше даты начала'}
                    />
                </div>
                <LabeledInput onChange={setPlace} type="text" label={t('location')} />
                <ImageLoader onLoadCallback={(newImage) => setImage(newImage)} />
            </div>
            <div className={styles.buttons}>
                <Button callback={props.onCancel} type="default" text={t('back')} />
                <Button callback={submitForm} type="primary" text={t('next')} disabled={!checkForm()} />
            </div>
        </form>
    )
}
