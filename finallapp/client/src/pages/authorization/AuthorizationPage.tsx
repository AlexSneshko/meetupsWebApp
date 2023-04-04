import { AuthorizationForm } from '../../components/forms/authorization/AuthorizationForm'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { AuthorizationRequestData } from '../../core/types/AuthorizationRequestData'
import React, { useContext } from 'react'
import styles from './AuthorizationPage.module.scss'
import { useTranslation } from 'react-i18next'
import { UserStoreContext } from '../../context/storeContext'

export const AuthorizationPage = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const userStore = useContext(UserStoreContext)
    const { t } = useTranslation()

    const onAuthorizationFormSend = async (data: AuthorizationRequestData): Promise<void> => {
        const result = await userStore.loadUser(data)

        if (result) {
            navigate(-1)
        }
    }

    return (
        <section className="container smoothPage">
            <div className={styles.authorizationPage}>
                <h1 className={`basicH1 ${styles.title}`}>{t('authorization')}</h1>
                <p className={`paragraph ${styles.description}`}>
                    {t('authorizeMessage')}
                </p>
                <AuthorizationForm onSubmit={onAuthorizationFormSend} />
            </div>
        </section>
    )
}
