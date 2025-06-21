export interface ProductCard {
    id: string
    title: string
    description: string
    basePrice: number
    images: string[]
    endTime: string
    totalBids: number
    isFeatured: boolean
    isSoldout: boolean
    verifyRequest: boolean
    categoryName: string
    user: {
      name: string
      avatar: string
    }
  }
  