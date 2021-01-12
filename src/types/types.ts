export type postDataType = {
    id: number
    likes: number
    message: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType 
    aboutMe?: string
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type UsersDataType = {
    items: UsersType
    totalCount: number
    error: string
}
export type NavFriendsDataType = {
    id: number
    imgSrc: string
    name: string
}
export type dialogsDataType = {
    id: number
    imgSrc: string
    name: string
}
export type messagesDataType = {
    id: number
    message: string
    addresserYou: boolean
}