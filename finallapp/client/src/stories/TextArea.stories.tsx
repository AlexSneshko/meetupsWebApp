import { ComponentMeta, ComponentStory } from '@storybook/react'
import { TextArea } from '../components/ui/textArea/TextArea'

export default {
    title: 'UI/TextArea',
    component: TextArea
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

export const BasicTextArea = Template.bind({})
BasicTextArea.args = {
    name: 'Описание'
}

export const CountingTextArea = Template.bind({})
CountingTextArea.args = {
    name: 'Описание',
    maxLength: 15
}
