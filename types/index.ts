// types/index.ts

export interface User {
  id: string
  name: string
  email: string
  role: 'buyer' | 'seller' | 'admin'
}

export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  category: string
  brand: string
  location: string
  condition: string
  description: string
  sellerId: string
}

export interface Auction {
  id: string
  productId: string
  endTime: string
  currentBid: number
  bids: Bid[]
}

export interface Bid {
  userId: string
  amount: number
  timestamp: string
}