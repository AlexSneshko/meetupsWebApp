import React, { useContext } from 'react'
import styles from './CreateMeetupPage.module.scss'
import { CreateMeetupStepper } from '../../components/createMeetupStepper/CreateMeetupStepper'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { FormRequiredData } from '../../components/forms/meetupsForms/create/required/RequiredCreateForm'
import { FormAdditionalData } from '../../components/forms/meetupsForms/create/additional/AdditionalCreateForm'
import { CreatedMeetup } from '../../core/types/Meetup'
import { combineFormDataForCreatedMeetup } from '../../core/utils/combineFormDataForCreatedMeetup'
import { MeetupsStoreContext, UserStoreContext } from '../../context/storeContext'

export const CreateMeetupPage = (): JSX.Element => {
    const navigation: NavigateFunction = useNavigate()
    const meetupsStore = useContext(MeetupsStoreContext)
    const userStore = useContext(UserStoreContext)

    const leavePage = (): void => navigation('/meetups')

    const createMeetup = async (required: FormRequiredData, additional: FormAdditionalData): Promise<void> => {
        if (userStore.isAuthorized) {
            const combinedMeetup: CreatedMeetup = combineFormDataForCreatedMeetup(required, additional, userStore._user!)
            await meetupsStore.addMeetup(combinedMeetup)
            leavePage()
        }
    }

    return (
        <section className="container smoothPage">
          <div className={styles.createMeetupPage}>
            <CreateMeetupStepper onExit={leavePage} onCreate={createMeetup} />
          </div>
        </section>
    )
}
