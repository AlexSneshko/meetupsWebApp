import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SignInButton } from '../components/ui/signInButton/SignInButton'

export default {
    title: 'UI/SignInButton',
    component: SignInButton
} as ComponentMeta<typeof SignInButton>

const Template: ComponentStory<typeof SignInButton> = (args) => <SignInButton {...args} />

export const Button = Template.bind({})
Button.args = {
    
}

