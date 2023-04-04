import { ComponentMeta, ComponentStory } from '@storybook/react'
import NotificationBanner from '../components/notificationBanner/NotificationBanner'

export default {
    title: 'UI/NotificationBanner',
    component: NotificationBanner
} as ComponentMeta<typeof NotificationBanner>

const Template: ComponentStory<typeof NotificationBanner> = (args) => <NotificationBanner />

export const ErrorBanner = Template.bind({})
ErrorBanner.args = {

}

export const SuccessBanner = Template.bind({})
SuccessBanner.args = {

}

