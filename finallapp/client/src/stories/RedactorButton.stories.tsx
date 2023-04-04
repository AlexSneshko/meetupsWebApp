import { ComponentMeta, ComponentStory } from '@storybook/react'
import { RedactorButton } from '../components/ui/redactorButton/RedactorButton'

export default {
    title: 'UI/RedactorButton',
    component: RedactorButton
} as ComponentMeta<typeof RedactorButton>

const Template: ComponentStory<typeof RedactorButton> = (args) => <RedactorButton {...args} />

export const DeleteButton = Template.bind({})
DeleteButton.args = {
    type: 'delete',
    onClick: () => {}
}

export const EditButton = Template.bind({})
EditButton.args = {
    type: 'edit',
    onClick: () => {}
}
