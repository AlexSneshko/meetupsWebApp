import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import './i18n'


const root: ReactDOM.Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

// store provider
root.render(
    <React.StrictMode>
        <App/>     
    </React.StrictMode>
)
