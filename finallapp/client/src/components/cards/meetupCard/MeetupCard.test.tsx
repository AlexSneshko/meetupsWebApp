import { act, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Meetup } from "../../../core/types/Meetup";
import MeetupCard from "./MeetupCard";
import styles from './MeetupCard.module.scss'
import profileStyles from '../../profileInfo/ProfileInfo.module.scss'


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

describe('Meetup card component', () => {
  describe('Theme or meetup render', () => {
    it('Theme card render', () => {
      render(
        <MeetupCard meetup={meetup} onMeetupDelete={() => { }} onMeetupPreview={() => { }} />
      )

      const themeTopLine = document.querySelectorAll(`.topLine > .userInfo`);

      expect(themeTopLine.length > 0).toBeTruthy()
    })

    it('Meetup render', () => {
      render(
        <MeetupCard meetup={{ ...meetup, status: "CONFIRMED" }} onMeetupDelete={() => { }} onMeetupPreview={() => { }} />
      )

      const topLine = document.querySelector(`.${styles.topLine}`) as HTMLDivElement;

      expect(topLine.getElementsByClassName(styles.meetupDateInfo).length > 0).toBeTruthy()
    })
  })

  it('Theme card has all data view', () => {
    render(
      <MeetupCard meetup={meetup} onMeetupDelete={() => { }} onMeetupPreview={() => { }} />
    )

    const topLineAvatar = document.querySelector('.topLine .userInfo > span')
    const meetupSubject = document.querySelector('.meetupSubject')
    const meetupExcerpt = document.querySelector('.meetupExcerpt')

    expect(topLineAvatar?.innerHTML).toBe(`${meetup.author.name} ${meetup.author.surname}`)
    expect(meetupSubject?.innerHTML).toBe(meetup.subject)
    expect(meetupExcerpt?.innerHTML).toBe(meetup.excerpt)
  })

  it('Theme card has all data view', () => {
    render(
      <MeetupCard meetup={{ ...meetup, status: "CONFIRMED" }} onMeetupDelete={() => { }} onMeetupPreview={() => { }} />
    )

    const topLineAvatar = document.querySelector('.userInfo > span')
    const meetupSubject = document.querySelector('.meetupSubject')
    const meetupExcerpt = document.querySelector('.meetupExcerpt')

    expect(topLineAvatar?.innerHTML).toBe(`${meetup.author.name} ${meetup.author.surname}`)
    expect(meetupSubject?.innerHTML).toBe(meetup.subject)
    expect(meetupExcerpt?.innerHTML).toBe(meetup.excerpt)
  })
})
