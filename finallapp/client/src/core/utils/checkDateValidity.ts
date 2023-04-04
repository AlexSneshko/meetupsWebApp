import { MONTH_NAMES, DAYS_IN_MONTHS } from '../../core/constants/dateTimeConstants'

const isInteger = (value: string) => {
    return /^\+?\d+$/.test(value)
}

const checkDay = (day: number, month: number): boolean => day < 0 || day > DAYS_IN_MONTHS[month]
const checkYear = (year: number): boolean => year < 1923 || year > 2123
const checkHours = (hours: number): boolean => hours < 1 || hours > 23
const checkMinutes = (minutes: number): boolean => minutes < 0 || minutes > 59

export const checkDateValidity = (value: string): boolean => {
    const dateValues = value.split(' ')
    if (dateValues.length !== 4) {
        return true
    }

    const [day, month, year, time] = dateValues
    const [hours, minutes] = time.split(':')
    if (!isInteger(year) || !isInteger(day) || !isInteger(hours) || !isInteger(minutes) || MONTH_NAMES.indexOf(month) === -1) {
        return true
    }

    if (
        checkYear(Number(year)) ||
        checkDay(Number(day), MONTH_NAMES.indexOf(month)) ||
        checkHours(Number(hours)) ||
        checkMinutes(Number(minutes))
    ) {
        return true
    }

    return false
}

const checkDates = (start: string, finish: string): boolean => {
    const [startDay, startMonth, startYear, startTime] = start.split(' ')
    const [finishDay, finishMonth, finishYear, finishTime] = finish.split(' ')
    const [startHours, startMinutes] = startTime.split(':')
    const [finishHours, finishMinutes] = finishTime.split(':')
    const startMonthNumber = MONTH_NAMES.indexOf(startMonth)
    const finishMonthNumber = MONTH_NAMES.indexOf(finishMonth)

    const startDate = new Date(Number(startYear), startMonthNumber, Number(startDay), Number(startHours), Number(startMinutes))
    const finishDate = new Date(
        Number(finishYear),
        finishMonthNumber,
        Number(finishDay),
        Number(finishHours),
        Number(finishMinutes)
    )

    return startDate < finishDate
}

export const checkDatesValidity = (start: string, finish: string): boolean => {
    if (start !== '' && finish !== '' && !checkDateValidity(start) && !checkDateValidity(finish) && !checkDates(start, finish)) {
        return false
    } else {
        return true
    }
}
