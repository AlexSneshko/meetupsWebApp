import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Skeleton } from '../components/ui/skeleton/Skeleton'

export default {
    title: 'UI/Skeleton',
    component: Skeleton
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Primary = Template.bind({})
Primary.args = {
    
}

