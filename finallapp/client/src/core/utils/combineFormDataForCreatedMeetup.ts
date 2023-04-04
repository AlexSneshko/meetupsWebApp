import { FormRequiredData } from '../../components/forms/meetupsForms/create/required/RequiredCreateForm'
import { FormAdditionalData } from '../../components/forms/meetupsForms/create/additional/AdditionalCreateForm'
import { CreatedMeetup } from '../types/Meetup'
import { ShortUser } from '../types/User'

export const combineFormDataForCreatedMeetup = (
    required: FormRequiredData,
    additional: FormAdditionalData,
    user: ShortUser
): CreatedMeetup => {
    return {
        start: additional.start,
        finish: additional.finish,
        author: user,
        modified: new Date().toISOString(),
        image: additional.image as string,
        excerpt: required.description,
        place: additional.place,
        subject: required.name,
        speakers: []
    }
}
