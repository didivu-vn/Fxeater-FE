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