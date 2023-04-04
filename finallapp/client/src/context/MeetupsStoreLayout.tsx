import React from 'react'
import { Outlet } from 'react-router-dom'
import { MeetupsStore } from '../store/meetupsStore'
import { meetupsStore, MeetupsStoreContext } from './storeContext'


export const MeetupsStoreLayout = () => {    
  return (
    <MeetupsStoreContext.Provider value={meetupsStore}>
        <Outlet/>
    </MeetupsStoreContext.Provider>
  )
}
