import { ComponentStory } from '@storybook/react'
import { RequiredCreateForm } from '../components/forms/meetupsForms/create/required/RequiredCreateForm'
import { AdditionalCreateForm } from '../components/forms/meetupsForms/create/additional/AdditionalCreateForm'
import { AuthorizationForm } from '../components/forms/authorization/AuthorizationForm'
import { EditMeetupForm } from '../components/forms/meetupsForms/edit/EditMeetupForm'

export default {
    title: 'Containers/Form'
}

const RequiredFormTemplate: ComponentStory<typeof RequiredCreateForm> = (args) => <RequiredCreateForm {...args} />
const AdditionalFormTemplate: ComponentStory<typeof AdditionalCreateForm> = (args) => <AdditionalCreateForm {...args} />
const AuthorizationFormTemplate: ComponentStory<typeof AuthorizationForm> = (args) => <AuthorizationForm {...args} />
const EditFormTemplate: ComponentStory<typeof EditMeetupForm> = (args) => <EditMeetupForm {...args} />

export const RequiredForm = RequiredFormTemplate.bind({})
RequiredForm.args = {}

export const AdditionalForm = AdditionalFormTemplate.bind({})
AdditionalForm.args = {}

export const AuthForm = AuthorizationFormTemplate.bind({})
AuthForm.args = { onSubmit: () => {} }

export const EditForm = EditFormTemplate.bind({})
EditForm.args = {
    meetup: {
        id: 'aaa-aaa-aaa-aaa',
        modified: '2021-08-27T04:38:33.816Z',
        start: '2022-06-09T23:35:47.068Z',
        finish: '2022-06-10T02:51:47.068Z',
        author: {
            id: 'uuu-aaa',
            name: 'employee',
            surname: 'Gerlach'
        },
        speakers: [
            {
                id: 'uuu-aaa',
                name: 'employee',
                surname: 'Gerlach'
            }
        ],
        subject: 'Reverse-engineered even-keeled standardization',
        excerpt:
            'Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.',
        place: '630 Goyette Causeway',
        goCount: 64,
        status: 'CONFIRMED',
        image: null,
        isOver: false
    }
}
