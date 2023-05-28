export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
    rating: number
    view_count: number
    like_count: number
    created_at: number
    author: string
    replies : any[]
}

export interface IUserInfo {
    id:number
    base_user?: IBaseUser
    avatar:string
    gender: 'N' | 'M' | 'O' | 'F'
}

export interface IBaseUser {
    id:number
    email: string
    last_login:any
    username:string
}
