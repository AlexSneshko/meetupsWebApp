import { render } from "@testing-library/react"
import { News } from "../../../core/types/News"
import { PreviewNews } from "./PreviewNews"

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

describe('PreviewNews component', () => {
    it('Preview all data', () => {
        render(
            <PreviewNews
                news={news}
                onCancel={() => { }}
                onRedact={() => { }} />
        )

        const newsTitle = document.querySelector('.newsTitle')
        const newsText = document.querySelector('.newsText')
        const image = document.querySelector('img')

        expect(image?.src).toBe(news.image)
        expect(newsTitle?.innerHTML).toBe(news.title)
        expect(newsText?.innerHTML).toBe(news.text)
    })

    it('Preview news without image', () => {
        render(
            <PreviewNews
                news={{ ...news, image: null }}
                onCancel={() => { }}
                onRedact={() => { }} />
        )

        expect(document.querySelector('img')?.src).toBe("http://localhost/default-meetup-img.png")
    })
})