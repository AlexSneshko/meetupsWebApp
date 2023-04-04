import React, { useContext, useEffect, useState } from 'react'
import styles from './MeetupCard.module.scss'
import profileIcon from '../../../assets/icons/profile-icon.svg'
import { Meetup } from '../../../core/types/Meetup'
import { RedactorButton } from '../../ui/redactorButton/RedactorButton'
import { ProfileInfo } from '../../profileInfo/ProfileInfo'
import { getMeetupDatePlaceInfo } from '../../../core/utils/meetups/getMeetupDatePlaceInfo'
import { useTranslation } from 'react-i18next'
import { getMeetupsVotedUsersFromServer } from '../../../core/utils/meetups/getMeetupsVotedUsersFromServer'
import { observer } from 'mobx-react-lite'
import { UserStoreContext } from '../../../context/storeContext'

export interface MeetupCardProps {
    meetup: Meetup
    onMeetupPreview: (meetup: Meetup) => void
    onMeetupDelete: (meetup: Meetup) => void
    onMeetupEdit?: (meetup: Meetup) => void
}

const MeetupCard = ({ meetup, onMeetupPreview, onMeetupDelete, onMeetupEdit }: MeetupCardProps): JSX.Element => {
    const type = meetup.status === 'REQUEST' ? 'basic' : 'moderation'
    const userStore = useContext(UserStoreContext)
    const { t } = useTranslation()

    const [supportsCount, setSupportsCount] = useState<number>()

    const loadSupports = async (): Promise<void> => {
        const res = await getMeetupsVotedUsersFromServer(meetup.id)

        setSupportsCount(res.length)
    }

    useEffect(() => {
        loadSupports()
    })

    return (
        <article data-ref="meetups.meetupCard" className={styles.meetupCard} onClick={() => onMeetupPreview(meetup)}>
            <div className={styles.topLine}>
                {type === 'basic' ? (
                    <ProfileInfo
                        user={meetup.author}
                        first="avatar"
                        userAvatarClassName={styles.userAvatar}
                        userNameClassName={styles.userName}
                    />
                ) : (
                    <div className={styles.meetupDateInfo}>{getMeetupDatePlaceInfo(meetup)}</div>
                )}
                {userStore.isModerator &&
                    <div data-ref="meetupCard.refactoring" className={styles.editCard}>
                        <RedactorButton type="delete" onClick={() => onMeetupDelete(meetup)} />
                        {type === 'moderation' && typeof onMeetupEdit !== 'undefined' && (
                            <RedactorButton type="edit" onClick={() => onMeetupEdit(meetup)} className={styles.editButton} />
                        )}
                    </div>
                }
            </div>
            <div className={styles.meetupInfo}>
                <h3 className={styles.meetupSubject}>{meetup.subject}</h3>
                <p className={styles.meetupExcerpt}>{meetup.excerpt}</p>
            </div>
            {type == 'basic' ? (
                <div className={styles.bottomLine}>
                    <img src={profileIcon} />
                    <span className={styles.supportInfo}>{supportsCount} {t('support')}</span>
                </div>
            ) : (
                <ProfileInfo
                    user={meetup.author}
                    first="avatar"
                    userAvatarClassName={styles.userAvatar}
                    userNameClassName={styles.userName}
                />
            )}
        </article>
    )
}

export default observer(MeetupCard)