import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SignInButton.module.scss'

export interface SignInButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const SignInButton = ({ onClick }: SignInButtonProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <button data-ref="signInButton" className={styles.signInButton} onClick={onClick}>
      {t('signIn')}
    </button>
  )
}
