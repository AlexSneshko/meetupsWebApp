import { ComponentMeta, ComponentStory } from '@storybook/react'
import PreviewMeetup from '../components/preview/previewMeetup/PreviewMeetup'

export default {
    title: 'Pages/PreviewMeetup',
    component: PreviewMeetup
} as ComponentMeta<typeof PreviewMeetup>

const Template: ComponentStory<typeof PreviewMeetup> = (args) => <PreviewMeetup {...args} />

export const ThemePreview = Template.bind({})
ThemePreview.args = {
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

export const MeetupPreview = Template.bind({})
MeetupPreview.args = {
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
