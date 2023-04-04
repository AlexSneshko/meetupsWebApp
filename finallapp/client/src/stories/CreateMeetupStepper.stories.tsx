import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CreateMeetupStepper } from '../components/createMeetupStepper/CreateMeetupStepper'
import '../styles/colors.scss'
import '../styles/typography.scss'
import '../index.scss'

export default {
    title: 'Containers/Create Stepper',
    component: CreateMeetupStepper
} as ComponentMeta<typeof CreateMeetupStepper>

const Template: ComponentStory<typeof CreateMeetupStepper> = (args) => <CreateMeetupStepper {...args} />

export const Stepper = Template.bind({})
Stepper.args = {
    onCreate: () => {}
}
