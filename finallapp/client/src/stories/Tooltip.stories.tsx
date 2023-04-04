import { ComponentMeta, ComponentStory } from '@storybook/react'
import Tooltip from '../components/ui/tooltip/Tooltip'

export default {
    title: 'UI/Tooltip',
    component: Tooltip
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Primary = Template.bind({})
Primary.args = {
    type: 'primary',
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
}
