export const BASE_SERVER_URL: string = '/'
export const MEETUPS_URL: string = 'api/meetups'
export const LOGIN_URL: string = 'api/login'
export const LOGOUT_URL: string = 'api/logout'
export const VOTEDUSERS_URL = (meetupId: string): string => `/${meetupId}/votedusers`
export const NEWS_URL: string = 'api/news'