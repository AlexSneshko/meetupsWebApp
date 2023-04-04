import React, { useContext, useState } from 'react'
import { News } from '../../../core/types/News'
import styles from './PreviewNews.module.scss'
import defaultPhoto from '../../../assets/images/default-meetup-img.png'
import Button from '../../ui/button/Button'
import { Skeleton } from '../../ui/skeleton/Skeleton'
import { useTranslation } from 'react-i18next'
import { UserStoreContext } from '../../../context/storeContext'

export interface PreviewNewsProps {
  news: News
  onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onRedact: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const PreviewNews = ({ news, onCancel, onRedact }: PreviewNewsProps) => {
  const { t } = useTranslation()
  const userStore = useContext(UserStoreContext)

  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <article>
      <Skeleton className={styles.photoSceleton} style={{ display: imageLoading ? "block" : "none" }} />
      <img className={styles.photo}
        src={news.image || defaultPhoto}
        onLoad={() => setImageLoading(false)}
        style={{ display: imageLoading ? "none" : "block" }} />
      <div className={styles.block}>
        <h2 className={styles.newsTitle}>{news.title}</h2>
        <p className={styles.newsText}>{news.text}</p>
      </div>
      <div className={styles.buttonsBlock}>
        <Button type='default' text={t('back')} callback={onCancel} className={styles.button} />
        {userStore.isModerator &&
          <Button type='secondary' text={t('edit')} callback={onRedact} className={styles.button} />
        }
      </div>
    </article>
  )
}
