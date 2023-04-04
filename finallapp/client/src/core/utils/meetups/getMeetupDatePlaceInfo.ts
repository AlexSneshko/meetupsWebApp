import { DAY_NAMES, DAY_SHORT_NAMES, MONTH_NAMES } from '../../constants/dateTimeConstants'
import { Meetup } from '../../types/Meetup'

export const getMeetupDatePlaceInfo = (meetup: Meetup): string => {
    const dateInfo = new Date(meetup.start)

    if (isNaN(dateInfo.getTime())) {
        return '-'
    }

    const dayName = DAY_SHORT_NAMES[dateInfo.getDay()]
    const mountName = MONTH_NAMES[dateInfo.getMonth()]
    const hours = dateInfo.getHours()
    const minutes = dateInfo.getMinutes()
    const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`

    const result = `${dayName}., ${dateInfo.getDate()} ${mountName} • ${time} ${meetup.place && `• ${meetup.place}`}`

    return result
}

export const getMeetupDate = (meetup: Meetup): string | null => {
    const dateInfo = new Date(meetup.start)

    if (isNaN(dateInfo.getTime())) {
        return null
    }

    const dayName = DAY_NAMES[dateInfo.getDay()]
    const mountName = MONTH_NAMES[dateInfo.getMonth()]

    const result = `${dayName}, ${dateInfo.getDate()} ${mountName.toLowerCase()}, ${dateInfo.getFullYear()}`

    return result
}

export const getMeetupTime = (meetup: Meetup): string | null => {
    const startDateInfo = new Date(meetup.start)
    const finishDateInfo = new Date(meetup.finish)

    if (isNaN(startDateInfo.getTime()) || isNaN(finishDateInfo.getTime())) {
        return null
    }

    const startHours = startDateInfo.getHours()
    const startMinutes = startDateInfo.getMinutes()
    const startTime = isNaN(startDateInfo.getTime()) ? '-' : 
      `${startHours < 10 ? `0${startHours}` : startHours}:${startMinutes < 10 ? `0${startMinutes}` : startMinutes}`

    const finishHours = finishDateInfo.getHours()
    const finishMinutes = finishDateInfo.getMinutes()
    const finishTime = isNaN(finishDateInfo.getTime()) ? '-' : 
      `${finishHours < 10 ? `0${finishHours}` : finishHours}:${finishMinutes < 10 ? `0${finishMinutes}` : finishMinutes}`

    const result = `${startTime} - ${finishTime}`

    return result
}
