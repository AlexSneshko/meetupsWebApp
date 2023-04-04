import { News } from '../../types/News'

export const getNewsDate = (news: News): string => {
    const publishDate = new Date(news.publicationDate)
    const day = publishDate.getUTCDate()
    const month = publishDate.getUTCMonth() + 1
    const year = publishDate.getUTCFullYear()

    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
}
