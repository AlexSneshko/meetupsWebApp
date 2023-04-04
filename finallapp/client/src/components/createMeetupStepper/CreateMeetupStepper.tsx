import React from 'react'
import { Steps } from './steps/Steps'
import styles from './CreateMeetupStepper.module.scss'
import { RequiredCreateForm, FormRequiredData } from '../forms/meetupsForms/create/required/RequiredCreateForm'
import { FormAdditionalData, AdditionalCreateForm } from '../forms/meetupsForms/create/additional/AdditionalCreateForm'
import { useTranslation } from 'react-i18next'

interface CreateMeetupStepperProps {
    onCreate?: (required: FormRequiredData, additional: FormAdditionalData) => void
    onExit: () => void
}

export const CreateMeetupStepper = (props: CreateMeetupStepperProps): JSX.Element => {
    const { t } = useTranslation()

    const STEPS: Array<string> = [t('requiredFields'), t('additionalFields')]

    const [currentStep, setCurrentStep] = React.useState<number>(0)
    const [requiredFormData, setRequiredFormData] = React.useState<FormRequiredData | null>(null)

    const onRequiredFormSubmit = (data: FormRequiredData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event?.preventDefault()
        setRequiredFormData(data)
        setCurrentStep((old) => old + 1)
    }

    const onAdditionalFormSubmit = (data: FormAdditionalData, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event?.preventDefault()
        props.onCreate && props.onCreate(requiredFormData!, data)
    }

    const onAdditionalFormCancel = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event?.preventDefault()
        setCurrentStep((old) => old - 1)
    }

    return (
        <div className={styles.stepper}>
            <Steps steps={STEPS} current={currentStep} />
            <div className={styles.text}>
                <h2 className="basicH1">{t('newMeetup')}</h2>
                <p className={`paragraph ${styles.description}`}>
                    {t('newMeetupMessage')}
                </p>
            </div>

            {currentStep === 0 ? (
                <RequiredCreateForm onSubmit={onRequiredFormSubmit} onCancel={props.onExit} />
            ) : (
                <AdditionalCreateForm onSubmit={onAdditionalFormSubmit} onCancel={onAdditionalFormCancel} />
            )}
        </div>
    )
}
