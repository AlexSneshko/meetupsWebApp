import React, { useContext, useEffect, useState } from 'react'
import styles from './PreviewNewsPage.module.scss'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { PreviewNews } from '../../components/preview/previewNews/PreviewNews'
import { News } from '../../core/types/News'
import { useTranslation } from 'react-i18next'
import { NewsStoreContext } from '../../context/storeContext'

export const PreviewNewsPage = () => {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  const newsStore = useContext(NewsStoreContext)

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const loadNews = async () => {
    setLoading(true)
    if (id) {
      const data = await newsStore.getNewsById(id)
      setNews(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadNews()
  }, [])

  const onCancel = () => {
    navigate('/news')
  }

  const onRedact = () => {
    navigate(`/news/edit-news/${id}`)
  }

  return (
    <section className='container smoothPage'>
      {loading ? 
      <div className={styles.loading}></div>
      :
      news && (
        <div className={styles.previewNewsPage}>
          <h1 className={styles.newsPageTitle}>{t('viewNews')}</h1>
          <PreviewNews news={news} onCancel={onCancel} onRedact={onRedact} />
        </div>
      )
      }
    </section>
  )
}
