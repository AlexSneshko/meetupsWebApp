export interface News {
    id: string
    publicationDate: string
    title: string
    text: string
    image: string | null
}

export type CreatedNews = Omit<News, 'id' | 'publicationDate'>