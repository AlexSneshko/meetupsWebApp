import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ProfileInfo } from '../components/profileInfo/ProfileInfo'

export default {
    title: 'ProfileInfo',
    component: ProfileInfo
} as ComponentMeta<typeof ProfileInfo>

const Template: ComponentStory<typeof ProfileInfo> = (args) => <ProfileInfo {...args} />

export const FirstName = Template.bind({})
FirstName.args = {
    user: {
        id: 'jjjj',
        name: 'Jony',
        surname: 'Boy'
    },
    first: 'name',
}

export const FirstAvatar = Template.bind({})
FirstAvatar.args = {
    user: {
        id: 'jjjj',
        name: 'Jony',
        surname: 'Boy'
    },
    first: 'avatar',
}

export const EmptyUserName = Template.bind({})
EmptyUserName.args = {
    user: {
        id: 'jjjj',
        name: 'Jony',
        surname: 'Boy'
    },
    first: 'onlyAvatar',
}
