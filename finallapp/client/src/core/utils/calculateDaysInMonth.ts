import { DAYS_IN_MONTHS, DISPLAYED_DAYS_COUNT } from '../constants/dateTimeConstants'
import { Day } from '../../components/ui/dateInput/DateInput'

export const calculateDaysInMonth = (year: number, month: number) => {
    const newDays: Day[] = []
    const maxDays = DAYS_IN_MONTHS[month] + 1
    const maxDaysInPrevMoth = (DAYS_IN_MONTHS[month - 1] || DAYS_IN_MONTHS[11]) + 1
    const firstDayInMonth = new Date(year, month, 1).getDay()
    const lastDayInMonth = firstDayInMonth + maxDays - 1
    let isCurrentMonth = false

    for (let i = 0, dayNumber = maxDaysInPrevMoth - firstDayInMonth; i < DISPLAYED_DAYS_COUNT; i++, dayNumber++) {
        if (dayNumber === maxDaysInPrevMoth && !isCurrentMonth) {
            dayNumber = 1
            isCurrentMonth = true
        }

        if (dayNumber === maxDays && isCurrentMonth) {
            dayNumber = 1
        }

        const day: Day = {
            number: dayNumber,
            isCurrentMoth: false
        }

        if (i >= firstDayInMonth && i < lastDayInMonth) {
            day.isCurrentMoth = true
        }

        newDays.push(day)
    }

    return newDays
}
