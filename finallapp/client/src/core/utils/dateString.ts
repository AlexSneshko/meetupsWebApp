import { MONTH_NAMES } from "../constants/dateTimeConstants"

export const getStringDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
        return ''
    }

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let newValue = ''

    if (day !== undefined && hours !== undefined && hours !== undefined) {
        const formatedHours = `${hours}`.padStart(2, '0')
        const formatedMinutes = `${minutes}`.padStart(2, '0')
        newValue = `${day} ${MONTH_NAMES[month]} ${year} ${formatedHours}:${formatedMinutes}`
    }
    
    return newValue
}
