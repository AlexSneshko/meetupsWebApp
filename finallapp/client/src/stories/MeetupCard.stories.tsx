import { ComponentMeta, ComponentStory } from '@storybook/react'
import MeetupCard from '../components/cards/meetupCard/MeetupCard'

export default {
    title: 'Containers/MeetupCard',
    component: MeetupCard
} as ComponentMeta<typeof MeetupCard>

const Template: ComponentStory<typeof MeetupCard> = (args) => <MeetupCard {...args} />

export const Basic = Template.bind({})
Basic.args = {
    meetup: {
        id: 'aaa-aaa-aaa-aaa',
        modified: '2021-08-27T04:38:33.816Z',
        start: '2022-06-09T23:35:47.068Z',
        finish: '2022-06-10T02:51:47.068Z',
        author: {
            id: 'uuu-bbb',
            name: 'chief',
            surname: 'Blick'
        },
        speakers: [
            {
                id: 'uuu-bbb',
                name: 'chief',
                surname: 'Blick'
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
    },
    onMeetupDelete: () => {}
}

export const ModeratorCard = Template.bind({})
ModeratorCard.args = {
    meetup: {
        id: 'aaa-aaa-aaa-aaa',
        modified: '2021-08-27T04:38:33.816Z',
        start: '2022-06-09T23:35:47.068Z',
        finish: '2022-06-10T02:51:47.068Z',
        author: {
            id: 'uuu-bbb',
            name: 'chief',
            surname: 'Blick'
        },
        speakers: [
            {
                id: 'uuu-bbb',
                name: 'chief',
                surname: 'Blick'
            }
        ],
        subject: 'Reverse-engineered even-keeled standardization',
        excerpt:
            'Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.',
        place: '630 Goyette Causeway',
        goCount: 64,
        status: 'DRAFT',
        image: null,
        isOver: false
    },
    onMeetupDelete: () => {},
    onMeetupEdit: () => {}
}
