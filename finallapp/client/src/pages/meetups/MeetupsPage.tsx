import React, { useContext, useEffect, useState } from 'react'
import styles from './MeetupsPage.module.scss'
import MeetupsList from '../../components/lists/meetupsList/MeetupsList'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs } from '../../components/ui/tabs/Tabs'
import { MeetupStatus } from '../../core/types/Meetup'
import { MeetupsStoreContext } from '../../context/storeContext'

const MeetupsPage = (): JSX.Element => {
    const meetupsStore = useContext(MeetupsStoreContext);
    const { t } = useTranslation();
    const { status } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)

    enum KeyStatuses {
        'REQUEST' = 'topics',
        'DRAFT' = 'onModeration',
        'CONFIRMED' = 'upcoming',
        'PAST' = 'finished'
    }

    const switchTab = (key: string) => {
        navigate(`/meetups/${getNameByStatus(key)}`)
    }

    const getNameByStatus = (key: string) => {
        const activeKeyIndex = Object.keys(KeyStatuses).indexOf(key);
        return Object.values(KeyStatuses)[activeKeyIndex];
    }

    const getActiveTabKey = (): MeetupStatus => {
        if (status) {
            const activeKeyIndex = Object.values(KeyStatuses).indexOf(status as KeyStatuses);
            const activeValue = Object.keys(KeyStatuses)[activeKeyIndex];

            return activeValue as MeetupStatus
        }

        return 'REQUEST'
    }

    const loadingMeetups = async () => {
        setLoading(true)
        meetupsStore.loadMeetups()
        setLoading(false)
    }

    useEffect(() => {
        loadingMeetups()
    }, [])

    return (
        <section className="container smoothPage">
          <div className={styles.meetupsPage}>
            <h1 className="basicH1">{t('meetups')}</h1>
            <Tabs className={styles.tabs} tabs={[
              { key: "REQUEST", name: t('topics') },
              { key: "DRAFT", name: t('onModeration') },
              { key: "CONFIRMED", name: t('upcoming') },
              { key: "PAST", name: t('finished') }
            ]} onTabChange={switchTab} activeTabKey={getActiveTabKey()} />
            {loading ?
            <div className={styles.loading}></div>
            :
            <MeetupsList status={getActiveTabKey()} />
            }
          </div>
        </section>
    )
}

export default observer(MeetupsPage)
