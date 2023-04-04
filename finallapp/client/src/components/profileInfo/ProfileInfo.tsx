import classNames from 'classnames'
import React from 'react'
import styles from './ProfileInfo.module.scss'
import { ShortUser } from '../../core/types/User'

export interface ProfileInfoProps {
    user: ShortUser
    first: 'name' | 'avatar' | 'onlyAvatar'
    userAvatarClassName?: string
    userNameClassName?: string
}

export const ProfileInfo = ({ user, first, userAvatarClassName, userNameClassName }: ProfileInfoProps) => {
    return (
        <div className={styles.userInfo}>
            <div className={classNames(styles.customUserAvatar, styles[`user${first}First`], userAvatarClassName)}>
                {user.name[0]}
                {user.surname[0]}
                {user.name === '' && user.surname === '' && '-'}
            </div>
            {first !== 'onlyAvatar' &&
                <span className={userNameClassName}>
                    {user.name} {user.surname}
                </span>
            }
        </div>
    )
}
