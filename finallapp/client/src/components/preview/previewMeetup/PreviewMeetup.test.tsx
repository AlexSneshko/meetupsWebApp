import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import { Meetup } from "../../../core/types/Meetup";
import PreviewMeetup from "./PreviewMeetup"

const meetup: Meetup = {
    id: "33f0b514-0a84-4460-b78f-f645224a5c7f",
    modified: "2022-08-17T18:16:01.727Z",
    start: "2023-10-16T02:28:48.883Z",
    finish: "2023-10-16T04:17:48.883Z",
    author: {
        "id": "uuu-aaa",
        "name": "employee",
        "surname": "Gerlach"
    },
    speakers: [
        {
            id: "uuu-aaa",
            name: "employee",
            surname: "Gerlach"
        }
    ],
    subject: "User-friendly high-level workforce",
    excerpt: "Commodi numquam vero ut ducimus ea. Corrupti hic eaque quia aut enim facilis architecto quasi. Sit dolores similique. Et modi laboriosam accusantium saepe soluta ratione expedita et qui. Occaecati asperiores amet qui rem et quis beatae dolore.",
    place: "9113 Kertzmann Pass",
    goCount: 81,
    status: "REQUEST",
    isOver: false,
    image: "http://placeimg.com/640/480/transport",
};

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

describe('PreviewMeetup component', () => {
    describe('Check meetup or theme preview', () => {
        it('Is theme preview', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={meetup}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            expect(screen.queryAllByRole('img').length > 0).toBeFalsy();
        })

        it('Is meetup preview', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={{ ...meetup, status: 'DRAFT' }}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            expect(screen.queryAllByRole('img').length > 0).toBeTruthy();
        })
    })

    describe('Meetup preview ', () => {
        it('Meetup has all date preview', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={{ ...meetup, status: 'DRAFT' }}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            const timePlaceLines = document.querySelectorAll('.timePlaceLine')
            const meetupAuthor = document.querySelector('.userInfo > span')
            const meetupDescription = document.querySelector('.excerptBlock > p')

            expect(timePlaceLines.length).toBe(3)
            expect(meetupAuthor?.innerHTML).toBe(`${meetup.author.name} ${meetup.author.surname}`)
            expect(meetupDescription?.innerHTML).toBe(meetup.excerpt)
        })

        it('Meetup without date and place information', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={{ ...meetup, status: 'DRAFT', start: '', finish: '', place: '' }}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            const timePlaceLines = document.querySelector('.meetupsTimePlace')

            expect(timePlaceLines).toBeNull()
        })

        it('Meetup preview without image', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={{ ...meetup, status: 'DRAFT', image: null }}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            expect(document.querySelector('img')?.src).toBe("http://localhost/default-meetup-img.png")
        })
    })

    describe('Theme preview ', () => {
        it('Theme preview', () => {
            render(
                <BrowserRouter>
                    <PreviewMeetup
                        meetup={{ ...meetup, status: 'DRAFT' }}
                        onApprove={() => { }}
                        onCancel={() => { }}
                        onDelete={() => { }}
                        onPublish={() => { }}
                        onUnvote={() => { }}
                        onVote={() => { }} />
                </BrowserRouter>
            )

            const meetupName = document.querySelector('.meetupNameText')
            const meetupAuthor = document.querySelector('.userInfo > span')
            const meetupDescription = document.querySelector('.excerptBlock > p')

            expect(meetupName?.innerHTML).toBe(meetup.subject)
            expect(meetupAuthor?.innerHTML).toBe(`${meetup.author.name} ${meetup.author.surname}`)
            expect(meetupDescription?.innerHTML).toBe(meetup.excerpt)
        })
    })
})