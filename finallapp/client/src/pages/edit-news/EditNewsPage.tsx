import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { EditNewsForm } from '../../components/forms/newsForms/edit/EditNewsForm'
import { NewsStoreContext } from '../../context/storeContext'
import { News } from '../../core/types/News'
import styles from './EditNewsPage.module.scss'

export const EditNewsPage = () => {
  const { id } = useParams()
  const navigate: NavigateFunction = useNavigate()
  const { t } = useTranslation();
  const newsStore = useContext(NewsStoreContext)

  const [news, setNews] = useState<News | null>();

  const onCancel = () => {
    navigate(`/news/preview-news/${id}`)
  }

  const onSave = async (news: News, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await newsStore.updateNews(news);
    onCancel()
  }

  const onDelete = async () => {
    if (id) {
      await newsStore.removeNews(id);
      navigate('/news')
    }
  }

  const loadNews = async () => {
    if (id) {
      const data = await newsStore.getNewsById(id)
      setNews(data)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  return (
    <section className='container smoothPage'>
      {news &&
        <div className={styles.editNewsPage}>
          <h1 className={styles.editPageTitle}>{t('newsEditing')}</h1>
          <EditNewsForm news={news} onCancel={onCancel} onSave={onSave} onDelete={onDelete} />
        </div>}
    </section>
  )
}
