import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/button/Button'
import styles from './NotFoundPage.module.scss'
import notFoundGif from '../../assets/images/not-found.gif'

export const NotFoundPage = () => {
  const navigate: NavigateFunction = useNavigate()

  const goHome = () => {
    navigate('/meetups')
  }

  return (
    <section className="container smoothPage">
      <div className={styles.notFoundPage}>
        <h1 className={styles.notFoundTitle}>Not found 404</h1>
        <img className={styles.notFoundImage} src={notFoundGif} alt="Page not found" />
        <Button type='primary' text='На главную' callback={goHome} />
      </div>
    </section>
  )
}
