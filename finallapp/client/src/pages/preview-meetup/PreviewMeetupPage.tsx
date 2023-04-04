import React, { useContext, useEffect, useState } from 'react'
import { Meetup } from '../../core/types/Meetup'
import styles from './PreviewMeetupPage.module.scss'
import PreviewMeetup from '../../components/preview/previewMeetup/PreviewMeetup'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { sendUserVoteToServer } from '../../core/utils/meetups/sendUserVoteToServer'
import { deleteUserVoteFromServer } from '../../core/utils/meetups/deleteUserVoteFromServer'
import { MeetupsStoreContext } from '../../context/storeContext'

export const PreviewMeetupPage = (): JSX.Element => {
    const { id } = useParams()
    const navigate: NavigateFunction = useNavigate()
    const meetupsStore = useContext(MeetupsStoreContext)
    const { t } = useTranslation()

    const [meetup, setMeetup] = useState<Meetup | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadMeetup = async () => {
        setLoading(true)
        if (id) {
            const data = await meetupsStore.getMeetupById(id)

            setMeetup(data)
        }
        setLoading(false)
    }

    const onCancel = () => {
        navigate(-1)
    }

    const onDelete = async (): Promise<void> => {
        if (id) {
            await meetupsStore.removeMeetup(id)
            onCancel()
        }
    }

    const onPublish = async (): Promise<void> => {
        if (id) {
            await meetupsStore.updateMeetupStatusById(id)
            onCancel()
        }
    }

    const onVote = async (): Promise<void> => {
        if (id) {
            await sendUserVoteToServer(id)
        }
    }

    const onUnvote = async (): Promise<void> => {
        if (id) {
            await deleteUserVoteFromServer(id)
        }
    }

    useEffect(() => {
        loadMeetup()
    }, [])

    return (
        <section className="container smoothPage">
            {loading ? 
            <div className={styles.loading}></div>
            :
            meetup && (
                <div className={styles.previewMeetupPage}>
                    {meetup.status === 'REQUEST' ? (
                        <>
                            <div className={styles.title}>
                                <h1>{t('viewTopic')}</h1>
                            </div>
                            <PreviewMeetup
                                meetup={meetup}
                                onCancel={onCancel}
                                onDelete={onDelete}
                                onApprove={onPublish}
                                onVote={onVote}
                                onUnvote={onUnvote}
                            />
                        </>
                    ) : (
                        <>
                            <div className={styles.title}>
                                <h1>{t('viewMeetup')}</h1>
                            </div>
                            <PreviewMeetup
                                meetup={meetup}
                                onCancel={onCancel}
                                onPublish={onPublish} />
                        </>
                    )}
                </div>
            )
            }
        </section>
    )
}
