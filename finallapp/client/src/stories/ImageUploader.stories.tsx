import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ImageLoader } from '../components/ui/imageLoader/ImageLoader'

export default {
    title: 'UI/Image uploader',
    component: ImageLoader
} as ComponentMeta<typeof ImageLoader>

const Template: ComponentStory<typeof ImageLoader> = (args) => <ImageLoader {...args} />

export const Uploader = Template.bind({})
Uploader.args = {
    onLoadCallback: (base64: string | null): void => console.log(base64)
}
