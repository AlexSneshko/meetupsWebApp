import React, { useContext, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import logo from '../../assets/images/Logo_SaM.svg'
import menuIcon from '../../assets/icons/menu-icon.png'
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom'
import { ProfileInfo } from '../profileInfo/ProfileInfo'
import { SignInButton } from '../ui/signInButton/SignInButton'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { UserStoreContext } from '../../context/storeContext'

const Header = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const userStore = useContext(UserStoreContext)
    const { t, i18n } = useTranslation();

    const [showMenu, setShowMenu] = useState<boolean>(false)

    const onSignIn = () => {
        navigate('/authorize')
    }

    const onLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value)
    }

    const a = () => {
        console.log('asgasg')
        setShowMenu(!showMenu)
    }

    return (
        <header className={classNames(styles.header, showMenu && styles.show)}>
            <div className={styles.headerContainer}>
                <img className={styles.logo} src={logo} alt="SaM logo" />
                <button className={styles.menuButton} onClick={a}>
                    <img src={menuIcon} alt="menu" />
                </button>
                <nav className={styles.navigation}>
                    <NavLink
                        to="/meetups"
                        className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}>
                        {t('meetups')}
                    </NavLink>
                    <NavLink to="/news" className={(active) => `${styles.navItem} ${active.isActive && styles.activeLink}`}>
                        {t('news')}
                    </NavLink>
                </nav>
                <div className={styles.userInfo}>
                    {userStore.isAuthorized ?
                        <ProfileInfo
                            user={userStore.user!}
                            first="name"
                            userAvatarClassName={styles.userAvatar}
                            userNameClassName={styles.userName}
                        />
                        :
                        <SignInButton onClick={onSignIn} />
                    }
                </div>
            </div>
            <div className={styles.languageSection}>
                {userStore.isAuthorized &&
                    <button className={styles.logoutButton} onClick={() => userStore.logout()}>logout</button>
                }
                <select className={styles.languageSelect} onChange={onLanguageChange}>
                    {i18n.languages.map((lng) =>
                        <option value={lng} key={lng}>{lng}</option>
                    )}
                </select>
            </div>
        </header>
    )
}

export default observer(Header)