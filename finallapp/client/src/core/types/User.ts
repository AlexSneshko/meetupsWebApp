export interface ShortUser {
    id: string
    name: string
    surname: string
}

export interface User extends ShortUser {
    post: string
    roles: 'EMPLOYEE' | 'CHIEF'
}
