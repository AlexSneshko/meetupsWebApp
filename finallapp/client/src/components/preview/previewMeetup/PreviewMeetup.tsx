import React, { useContext, useEffect, useState } from 'react'
import { ProfileInfo } from '../../profileInfo/ProfileInfo'
import Button from '../../ui/button/Button'
import { Meetup } from '../../../core/types/Meetup'
import { User } from '../../../core/types/User'
import styles from './PreviewMeetup.module.scss'
import calendarIcon from '../../../assets/icons/calendar-icon2.svg'
import clockIcon from '../../../assets/icons/clock-icon.svg'
import mapPinIcon from '../../../assets/icons/map-pin-icon.svg'
import defaultImage from '../../../assets/images/default-meetup-img.png'
import { getMeetupDate, getMeetupTime } from '../../../core/utils/meetups/getMeetupDatePlaceInfo'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '../../ui/skeleton/Skeleton'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { MeetupsStoreContext, UserStoreContext } from '../../../context/storeContext'

interface PreviewProps {
    meetup: Meetup
    onCancel: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface PreviewThemeProps extends PreviewProps {
    onDelete: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onApprove: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onVote: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onUnvote: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface PreviewMeetupProps extends PreviewProps {
    onPublish: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const PreviewMeetup = (props: PreviewThemeProps | PreviewMeetupProps): JSX.Element => {
    const { t } = useTranslation()
    const userStore = useContext(UserStoreContext)
    const meetupsStore = useContext(MeetupsStoreContext)

    const [allVotedUsers, setAllVotedUsets] = useState<Array<User>>([])
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const [isUserVoted, setIsUserVoted] = useState<boolean>(false)

    const type = props.meetup.status === 'REQUEST' ? 'theme' : 'meetup';

    const loadAllVotedUsers = async () => {
        const receivedMeetups: Array<User> = await meetupsStore.getVotedUsersByMeetupId(props.meetup.id)
        const votedUsers = receivedMeetups.slice(0, receivedMeetups.length)

        setAllVotedUsets(votedUsers)
        setIsUserVoted(!!votedUsers.find((user) => user.id === userStore._user?.id));
    }

    const onVotingHandler = (type: 'vote' | 'unvote', event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if ('onVote' in props) {
            type === 'vote' ? props.onVote(event) : props.onUnvote(event)

            loadAllVotedUsers()

            setIsUserVoted(!isUserVoted);
        }
    }

    useEffect((): void => {
        if (type === 'theme') {
            loadAllVotedUsers()
        }
    }, [])

    return (
        <article style={{ width: "100%" }}>
            {type === 'theme' ?
                <h5 className={styles.blockName}>{t('name')}</h5>
                :
                <>
                    <Skeleton className={styles.skeletonImage} style={{ display: imageLoading ? "block" : "none" }} />
                    <img
                        className={styles.meetupImage}
                        src={props.meetup.image || defaultImage}
                        onLoad={() => setImageLoading(false)}
                        style={{ display: imageLoading ? "none" : "block" }}
                    />
                </>
            }
            <div className={styles.meetupName}>
                <h2 className={styles.meetupNameText}>{props.meetup.subject}</h2>
            </div>
            {type === 'meetup' && (getMeetupDate(props.meetup) || getMeetupTime(props.meetup) || props.meetup.place) && (
                <>
                    <h5 className={styles.blockName}>{t('timeAndLocation')}</h5>
                    <div className={styles.meetupsTimePlace}>
                        {getMeetupDate(props.meetup) &&
                            <div className={styles.timePlaceLine}>
                                <img className={styles.timePlaceIcon} src={calendarIcon} alt="calendar" />
                                <span>{getMeetupDate(props.meetup)}</span>
                            </div>
                        }
                        {getMeetupTime(props.meetup) &&
                            <div className={styles.timePlaceLine}>
                                <img className={styles.timePlaceIcon} src={clockIcon} alt="clock" />
                                <span>{getMeetupTime(props.meetup)}</span>
                            </div>
                        }
                        {props.meetup.place &&
                            <div className={styles.timePlaceLine}>
                                <img className={styles.timePlaceIcon} src={mapPinIcon} alt="map pin" />
                                <span>{props.meetup.place}</span>
                            </div>
                        }
                    </div>
                </>
            )}
            <h5 className={styles.blockName}>{type === 'theme' ? t('author') : t('speaker')}</h5>
            <div className={styles.authorBlock}>
                <ProfileInfo user={props.meetup.author} first="avatar" userAvatarClassName={styles.userAvatar} />
            </div>
            <h5 className={styles.blockName}>{t('description')}</h5>
            <div className={styles.excerptBlock}>
                <p>{props.meetup.excerpt}</p>
            </div>
            {type === 'theme' &&
                <>
                    <h5 className={styles.blockName}>{t('Support')}</h5>
                    <div className={styles.supportBlock}>
                        {allVotedUsers.length === 0
                            ?
                            <p className={styles.noSupports}>{t('noSupports')}</p>
                            :
                            <div className={styles.votedUsersBlock}>
                                {allVotedUsers.slice().reverse().slice(0, 8).map((user) => (
                                    <ProfileInfo first='onlyAvatar' user={user} userAvatarClassName={styles.votedUserAvatar} />
                                ))}
                                {allVotedUsers.length > 8 &&
                                    <div className={styles.usersCount}>
                                        +{allVotedUsers.length - 8}
                                    </div>
                                }
                            </div>
                        }
                        {userStore.isAuthorized &&
                            <>
                                <hr />
                                <div data-ref="meetupPreview.voting" className={styles.voteSection}>
                                    {!isUserVoted ?
                                        <Button
                                            type="primary"
                                            text={t('vote')}
                                            callback={(event) => onVotingHandler('vote', event)}
                                            className={styles.voteButton} />
                                        :
                                        <Button
                                            type="secondary"
                                            text={t('unvote')}
                                            callback={(event) => onVotingHandler('unvote', event)}
                                            className={styles.voteButton} />
                                    }
                                </div>
                            </>
                        }
                    </div>
                </>
            }
            <div data-ref="previewMeetup.controlButtons" className={styles.buttonsBlock}>
                <Button type="default" text={t('back')} callback={(event) => props.onCancel(event)} className={styles.button} />
                {userStore.isModerator &&
                    ('onDelete' in props ? (
                        <div className={styles.rightButtons}>
                            <Button type="secondary" text={t('delete')} callback={(event) => props.onDelete(event)} className={styles.button} />
                            <Button type="primary" text={t('approveTopic')} callback={(event) => props.onApprove(event)} className={classNames(styles.button)} />
                        </div>
                    ) : props.meetup.status !== "PAST" && (
                        <Button type="primary" text={t('publish')} callback={(event) => props.onPublish(event)} className={styles.button} />
                    ))
                }

            </div>
        </article>
    )
}

export default observer(PreviewMeetup)