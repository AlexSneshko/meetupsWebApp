import React, { useContext } from 'react'
import styles from './NotificationBanner.module.scss'
import errorIcon from '../../assets/icons/error-icon.svg'
import successIcon from '../../assets/icons/success-icon.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { NotificationStoreContext } from '../../context/storeContext'

const NotificationBanner = () => {
  const { t } = useTranslation()
  const notificationStore = useContext(NotificationStoreContext)

  return !notificationStore.isEmpty ? (
    <div className={styles.notificationsContainer}>
      {notificationStore._notifications.map((notification) =>
        <div className={classNames(styles.notificationBannerContainer, styles[notification!.status])}>
          <img src={notification?.status === 'error' ? errorIcon : successIcon} alt="icon" />
          <div className={styles.infoSection}>
            <span className={styles.notificationStatus}>{t(notification!.status)}</span>
            <span className={styles.notificationMessage}>{notification?.message}</span>
          </div>
        </div>
      )}
    </div>
  ) :
    <>
    </>
}

export default observer(NotificationBanner)