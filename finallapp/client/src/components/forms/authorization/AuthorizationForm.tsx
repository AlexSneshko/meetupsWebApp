import styles from './AuthorizationForm.module.scss'
import React from 'react'
import Button from '../../ui/button/Button'
import { LabeledInput } from '../../ui/labeledInput/LabeledInput'
import { AuthorizationRequestData } from '../../../core/types/AuthorizationRequestData'
import { useTranslation } from 'react-i18next'

interface AuthorizationFormProps {
    onSubmit: (data: AuthorizationRequestData) => void
}

export const AuthorizationForm = (props: AuthorizationFormProps): JSX.Element => {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const { t } = useTranslation()

    const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) => event.preventDefault()

    const onAuthorizeButtonClick = (): void => props.onSubmit({ username: username, password: password })

    return (
        <form className={styles.form} onSubmit={preventDefaultSubmit} action="#">
            <LabeledInput
                label={t('username')}
                onChange={setUsername}
                type="text"
                placeholder="Albert Richards"
                className={styles.input}
                name="username"
            />
            <LabeledInput label={t('password')} onChange={setPassword} type="password" className={styles.input} name="password" />
            <Button text={t('signIn')} type="primary" callback={onAuthorizeButtonClick} />
        </form>
    )
}
