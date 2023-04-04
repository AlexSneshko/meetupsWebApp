import React, { useState, useEffect, useContext } from 'react'
import { EditMeetupForm } from '../../components/forms/meetupsForms/edit/EditMeetupForm'
import { Meetup } from '../../core/types/Meetup'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import styles from './EditMeetupPage.module.scss'
import { useTranslation } from 'react-i18next'
import { MeetupsStoreContext } from '../../context/storeContext'

export const EditMeetupPage = () => {
    const navigate: NavigateFunction = useNavigate()
    const { t } = useTranslation()
    const meetupsStore = useContext(MeetupsStoreContext)
    const { id } = useParams()

    const [meetup, setMeetup] = useState<Meetup | null>(null)

    const onCancel = (): void => {
        navigate(-1)
    }

    const onSave = async (meetup: Meetup, event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await meetupsStore.updateMeetup(meetup)

        navigate(-1)
    }

    const loadMeetup = async () => {
        if (id) {
            const receivedMeetup: Meetup | null = await meetupsStore.getMeetupById(id)
            setMeetup(receivedMeetup)
        }
    }

    useEffect(() => {
        loadMeetup()
    }, [])

    return (
        <section className="container smoothPage">
          {meetup && (
          <div className={styles.editMeetupPage}>
            <div className={styles.title}>
              <h1 className="basicH1">{t('meetupEditing')}</h1>
            </div>
            <EditMeetupForm
              meetup={meetup}
              onCancel={onCancel}
              onSave={onSave}
            />
            </div>
          )}
        </section>
    )
}
