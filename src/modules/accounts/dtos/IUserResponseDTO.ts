

interface IUserResponseDTO {
    email: string,
    name: string,
    id: string,
    avatar: string,
    avatar_url(): string
}

export {IUserResponseDTO}