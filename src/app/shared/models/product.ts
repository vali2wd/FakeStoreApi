import { ICategory } from "./category"
import { IRating } from "./rating"

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: ICategory
    image: string
    rating: IRating
  }
  