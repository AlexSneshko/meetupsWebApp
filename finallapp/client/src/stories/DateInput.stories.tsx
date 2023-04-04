import { useState } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DateInput } from '../components/ui/dateInput/DateInput'

export default {
    title: 'UI',
    component: DateInput
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />

const callback = (newValue: string) => {}

export const Input = Template.bind({})
Input.args = {
    setValue: callback
}
