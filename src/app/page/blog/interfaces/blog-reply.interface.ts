interface IAuthor {
    user: string,
    avatar:string
}

export interface IBlogReply {
    content: string
    created_at: string
    author:IAuthor
}

export interface IApiData {
    count: number
    next: any
    previous: any
    results: any[]
  }
  
export interface IBlogData {
  id: number
  created_at: string
  author: string
  author_info: IAuthor
  thumbnail_image_url: string
  description: string
  html_string: string
  name: string
  sub_title: string
  view_count: number
  like_count: number
  isShow?:boolean
  replies: IBlogReply[]
  status_type?:number
  is_valid?:number
  is_deleting?:boolean
}

export interface IBlogRelatedData {
  id: number
  name: string
  slug?: string
}