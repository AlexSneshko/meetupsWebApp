import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Input } from '../components/ui/input/Input'

export default {
    title: 'UI/Input',
    component: Input
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const DefaultState = Template.bind({})
DefaultState.args = {
    type: 'text',
    onChange: (newValue: string) => console.log(newValue),
    placeholder: 'Test placeholder'
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    type: 'text',
    onChange: (newValue: string) => console.log(newValue),
    placeholder: 'Test placeholder'
}

export const Success = Template.bind({})
Success.args = {
    type: 'text',
    onChange: (newValue: string) => console.log(newValue),
    status: 'success',
    placeholder: 'Test placeholder'
}

export const Error = Template.bind({})
Error.args = {
    type: 'text',
    onChange: (newValue: string) => console.log(newValue),
    status: 'invalid',
    placeholder: 'Test placeholder'
}
