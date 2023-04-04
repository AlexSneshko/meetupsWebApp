import { render } from '@testing-library/react';
import { News } from '../../../core/types/News';
import { getNewsDate } from '../../../core/utils/news/getNewsDate';
import { NewsCard } from './NewsCard';

const news: News = {
    id: '2de0306f-a712-4078-b1f0-b223c2f4246b',
    publicationDate: '2021-08-27T04:38:33.816Z',
    title: 'Reverse-engineered even-keeled standardization',
    text: 'Nemo pariatur dolores ut vero velit non.',
    image: 'http://placeimg.com/640/480/nature'
};

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { })
            }
        };
    }
}));

describe('Newscard component', () => {
    it('News card has all data view', () => {
        render(<NewsCard news={news} onPreview={() => { }} />);

        const newsImage = document.querySelector('img')
        const newsDate = document.querySelector('.newsDate')
        const newsTitle = document.querySelector('.newsTitle')
        const newsText = document.querySelector('.newsText')

        expect(newsImage?.src).toBe(news.image)
        expect(newsDate?.innerHTML).toBe(getNewsDate(news))
        expect(newsTitle?.innerHTML).toBe(news.title)
        expect(newsText?.innerHTML).toBe(news.text)
    });

    it('News wihtout image', () => {
        render(<NewsCard news={{ ...news, image: null }} onPreview={() => { }} />);

        const newsImage = document.querySelector('img')
        const newsDate = document.querySelector('.newsDate')
        const newsTitle = document.querySelector('.newsTitle')
        const newsText = document.querySelector('.newsText')

        expect(newsDate?.innerHTML).toBe(getNewsDate(news))
        expect(newsTitle?.innerHTML).toBe(news.title)
        expect(newsText?.innerHTML).toBe(news.text)

        expect(newsImage?.src).toBe("http://localhost/default-meetup-img.png")
    })
});
