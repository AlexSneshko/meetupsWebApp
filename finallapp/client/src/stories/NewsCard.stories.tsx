import { ComponentMeta, ComponentStory } from '@storybook/react'
import { NewsCard } from '../components/cards/newsCard/NewsCard'

export default {
    title: 'Containers/NewsCard',
    component: NewsCard
} as ComponentMeta<typeof NewsCard>

const Template: ComponentStory<typeof NewsCard> = (args) => <NewsCard {...args} />

export const BasicCard = Template.bind({})
BasicCard.args = {
    news: {
        id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
        publicationDate: '2021-08-27T04:38:33.816Z',
        title: 'Reverse-engineered even-keeled standardization',
        text: 'Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo parasdiatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo parasdiatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo parasdiatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non.',
        image: 'https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg'
    }
}

export const NoPhotoCard = Template.bind({})
NoPhotoCard.args = {
    news: {
        id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
        publicationDate: '2021-08-27T04:38:33.816Z',
        title: 'Reverse-engineered even-keeled standardization',
        text: 'Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo parasdiatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non. Nemo pariatur dolores ut vero velit non.',
        image: null
    }
}
