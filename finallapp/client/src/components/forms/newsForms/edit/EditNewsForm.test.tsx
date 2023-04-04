import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { News } from "../../../../core/types/News"
import { EditNewsForm } from "./EditNewsForm"

const news: News = {
    id: "2de0306f-a712-4078-b1f0-b223c2f4246b",
    publicationDate: "2021-08-27T04:38:33.816Z",
    title: "Reverse-engineered even-keeled standardization",
    text: "Nemo pariatur dolores ut vero velit non.",
    image: "http://placeimg.com/640/480/nature"
}

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
}));

describe('EditNews copmonent', () => {
    it('Initial values', () => {
        render(<EditNewsForm news={news} onCancel={() => { }} onDelete={() => { }} onSave={() => { }} />)

        const newsImage = document.querySelector('img')
        const newsTitle = document.querySelector('input')
        const newsText = document.querySelector('textarea')

        expect(newsImage?.src).toBe(news.image)
        expect(newsTitle?.value).toBe(news.title)
        expect(newsText?.value).toBe(news.text)
    })

    it('News title changing', () => {
        render(<EditNewsForm news={news} onCancel={() => { }} onDelete={() => { }} onSave={() => { }} />)

        const newsTitle = document.querySelector('input')


        userEvent.clear(newsTitle!)

        expect(newsTitle?.value).toBe('')

        userEvent.type(newsTitle!, 'hello world')

        expect(newsTitle?.value).toBe('hello world')
    })

    it('News text changing', () => {
        render(<EditNewsForm news={news} onCancel={() => { }} onDelete={() => { }} onSave={() => { }} />)

        const newsTitle = document.querySelector('textarea')


        userEvent.clear(newsTitle!)

        expect(newsTitle?.value).toBe('')

        userEvent.type(newsTitle!, 'hello world')

        expect(newsTitle?.value).toBe('hello world')
    })
})