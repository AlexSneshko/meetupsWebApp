import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import CreateNewsForm from '../../components/forms/newsForms/create/CreateNewsForm'
import { NewsStoreContext } from '../../context/storeContext'
import { CreatedNews } from '../../core/types/News'
import styles from './CreateNewsPage.module.scss'

export const CreateNewsPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation()
  const newsStore = useContext(NewsStoreContext)

  const onCancel = () => {
    navigate('/news')
  }

  const createNews = async (newNews: CreatedNews, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event?.preventDefault()
    const test = await newsStore.addNews(newNews)
    console.log(test)
    onCancel()
  }

  return (
    <section className="container smoothPage">
      <div className={styles.createNewsPage}>
        <h1 className={styles.newsPageTitle}>{t('newsCreation')}</h1>
        <CreateNewsForm onCancel={onCancel} onSubmit={createNews} />
      </div>
    </section>
  )
}
