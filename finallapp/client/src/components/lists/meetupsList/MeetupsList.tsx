import { Meetup, MeetupStatus } from '../../../core/types/Meetup'
import styles from './MeetupsList.module.scss'
import React, { useContext } from 'react'
import MeetupCard from '../../cards/meetupCard/MeetupCard'
import Button from '../../ui/button/Button'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { MeetupsStoreContext, UserStoreContext } from '../../../context/storeContext'

interface MeetupsListProps {
    status: MeetupStatus
}

const MeetupsList = (props: MeetupsListProps): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const { t } = useTranslation();
    const userStore = useContext(UserStoreContext);
    const meetupsStore = useContext(MeetupsStoreContext)

    const goToCreateMeetupPage = (): void => navigate('/meetups/create-meetup')

    const removeMeetupButtonClick = async (meetup: Meetup): Promise<void> => {
        await meetupsStore.removeMeetup(meetup.id)
    }

    const editMeetupButtonClick = (meetup: Meetup): void => {
        navigate(`/meetups/edit-meetup/${meetup.id}`)
    }

    const previewMeetupButtonClick = (meetup: Meetup): void => {
        navigate(`/meetups/preview-meetup/${meetup.id}`)
    }

    const renderedData: Array<Meetup> = meetupsStore.getMeetupsByStatus(props.status)

    const getTopicsCountMessage = (): string => {
        let meetupsStatusCount = renderedData.length;

        switch (props.status) {
            case 'REQUEST':
                return `${meetupsStatusCount} ${t('suggestedTopics')}`;
            case 'DRAFT':
                return `${meetupsStatusCount} ${t('onModeretionMeetups')}`;
            case 'CONFIRMED':
                return `${meetupsStatusCount} ${t('upcomingMeetups')}`;
            case 'PAST':
                return `${meetupsStatusCount} ${t('finishedMeetups')}`;
            default:
                return ''
        }
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.row}>
                <span className={styles.suggested}>{getTopicsCountMessage()}</span>
                <Button type="secondary" callback={goToCreateMeetupPage} text={t('createMeetup')} disabled={!userStore.isModerator} />
            </div>
            <div className={styles.meetups}>
                {renderedData.map((meetup: Meetup) => (
                    <MeetupCard
                        onMeetupDelete={removeMeetupButtonClick}
                        meetup={meetup}
                        key={meetup.id}
                        onMeetupEdit={editMeetupButtonClick}
                        onMeetupPreview={previewMeetupButtonClick}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default observer(MeetupsList)
