import React, { useContext, useEffect, useState } from 'react'
import NewsList from '../../components/lists/newsList/NewsList'
import styles from './NewsPage.module.scss'
import { observer } from 'mobx-react-lite'
import { NewsStoreContext } from '../../context/storeContext'

const NewsPage = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const newsStore = useContext(NewsStoreContext)

    const loadingNews = async () => {
        setLoading(true)
        await newsStore.loadAllNews()
        setLoading(false)
    }

    useEffect(() => {
        loadingNews()
    }, [])

    return (
        <section className="container smoothPage">
          <div className={styles.newsPage}>
            {loading ?
              <div className={styles.loading}></div>
              :
              <NewsList />
            }
          </div>
        </section>
    )
}

export default observer(NewsPage)
