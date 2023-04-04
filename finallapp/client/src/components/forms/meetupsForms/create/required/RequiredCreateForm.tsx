import React from 'react'
import styles from './RequiredCreateForm.module.scss'
import { LabeledInput } from '../../../../ui/labeledInput/LabeledInput'
import { TextArea } from '../../../../ui/textArea/TextArea'
import { useInput } from '../../../../../core/hooks/useInput'
import { checkMinLength, checkMaxLength } from '../../../../../core/utils/inputValidation'
import Button from '../../../../ui/button/Button'
import { useTranslation } from 'react-i18next'

export interface FormRequiredData {
    name: string
    speaker: string
    description: string
}

interface RequiredCreateFormProps {
    onSubmit: (data: FormRequiredData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onCancel: () => void
}

const minInputLength = 0
const maxInputLength = 100
const maxTextAreaLength = 500

const validationOptions = {
    minLength: checkMinLength(minInputLength),
    maxLength: checkMaxLength(maxInputLength)
}

const errorMessages = {
    minLength: 'Поле не может быть пустым',
    maxLength: 'Поле слишком длинное'
}

export const RequiredCreateForm = (props: RequiredCreateFormProps): JSX.Element => {
    const { t } = useTranslation();

    const name = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const speaker = useInput<typeof validationOptions>(validationOptions, errorMessages)
    const description = useInput<typeof validationOptions>(
        {
            ...validationOptions,
            maxLength: checkMaxLength(maxTextAreaLength)
        },
        errorMessages
    )

    const checkForm = (): boolean => [name, speaker, description].every((input) => input.status === 'success')

    const getData = () => {
        return {
            name: name.value,
            speaker: speaker.value,
            description: description.value
        }
    }

    return (
        <form className={styles.form}>
            <div className={styles.inputs}>
                <LabeledInput
                    onChange={name.setValue}
                    onBlur={() => name.setIsOnBlur(true)}
                    status={name.status}
                    type="text"
                    label={t('name')}
                    helpText={name.message}
                    name="name"
                />
                <LabeledInput
                    onChange={speaker.setValue}
                    onBlur={() => speaker.setIsOnBlur(true)}
                    status={speaker.status}
                    type="text"
                    label={t('speaker')}
                    helpText={speaker.message}
                    name="speaker"
                />
                <TextArea
                    onChange={(event) => description.setValue(event.target.value)}
                    onBlur={() => description.setIsOnBlur(true)}
                    status={description.status}
                    name={t('description') || undefined}
                    maxLength={maxTextAreaLength}
                    helpText={description.message}
                />
            </div>
            <div className={styles.buttons}>
                <Button callback={props.onCancel} type="default" text={t('back')} />
                <Button
                    callback={(event) => props.onSubmit(getData(), event)}
                    type="primary"
                    text={t('next')}
                    disabled={!checkForm()}
                />
            </div>
        </form>
    )
}
