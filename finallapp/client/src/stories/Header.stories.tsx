import { ComponentMeta, ComponentStory } from '@storybook/react'
import Header from '../components/header/Header'

export default {
    title: 'Header',
    component: Header
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header />

export const MainHeader = Template.bind({})
MainHeader.args = {
    user: {
        id: 'jjjj',
        name: 'Albert',
        surname: 'Richards'
    }
}

export const MainNoNameHeader = Template.bind({})
MainNoNameHeader.args = {}
