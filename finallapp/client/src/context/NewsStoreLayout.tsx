import React from 'react'
import { Outlet } from 'react-router-dom'
import { newsStore, NewsStoreContext } from './storeContext'

export const NewsStoreLayout= () => {
  return (
    <NewsStoreContext.Provider value={newsStore}>
        <Outlet/>
    </NewsStoreContext.Provider>
  )
}
