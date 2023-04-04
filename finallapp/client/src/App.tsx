import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MeetupsPage from './pages/meetups/MeetupsPage'
import NewsPage from './pages/news/NewsPage'
import Header from './components/header/Header'
import { CreateMeetupPage } from './pages/create-meetup/CreateMeetupPage'
import { AuthorizationPage } from './pages/authorization/AuthorizationPage'
import { EditMeetupPage } from './pages/edit-meetup/EditMeetupPage'
import { PreviewMeetupPage } from './pages/preview-meetup/PreviewMeetupPage'
import { PreviewNewsPage } from './pages/preview-news/PreviewNewsPage'
import { CreateNewsPage } from './pages/create-news/CreateNewsPage'
import { EditNewsPage } from './pages/edit-news/EditNewsPage'
import { NotFoundPage } from './pages/not-found/NotFoundPage'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import NotificationBanner from './components/notificationBanner/NotificationBanner'
import { MeetupsStoreLayout } from './context/MeetupsStoreLayout'
import { NewsStoreLayout } from './context/NewsStoreLayout'


const App = (): JSX.Element => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng)
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <NotificationBanner />
            <Routes>
                <Route path="/" element={<Navigate to="/meetups" />} />
                <Route path='/meetups' element={<MeetupsStoreLayout/>}>
                    <Route path="" element={<Navigate to="topics" />} />
                    <Route path=":status" element={<MeetupsPage />}></Route>
                    <Route path="create-meetup" element={<CreateMeetupPage />} />
                    <Route path="edit-meetup/:id" element={<EditMeetupPage />} />
                    <Route path="preview-meetup/:id" element={<PreviewMeetupPage />} />
                </Route>
                <Route path="/news" element={<NewsStoreLayout />}>
                    <Route path="" element={<NewsPage />} />
                    <Route path="create-news" element={<CreateNewsPage />}/>  
                    <Route path="preview-news/:id" element={<PreviewNewsPage />}/>  
                    <Route path="edit-news/:id" element={<EditNewsPage />}/>
                </Route>
                <Route path="/authorize" element={<AuthorizationPage />} />
                <Route path='*' element={<NotFoundPage />}/>     
            </Routes>        
        </BrowserRouter>
    )
}

export default observer(App)
