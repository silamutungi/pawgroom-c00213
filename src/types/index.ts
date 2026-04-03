export interface Groomer {
  id: string
  user_id: string
  name: string
  bio: string
  location: string
  city: string
  state: string
  rating: number
  review_count: number
  price_small: number
  price_medium: number
  price_large: number
  specialties: string[]
  certifications: string[]
  years_experience: number
  available_today: boolean
  background_checked: boolean
  accepts_large_breeds: boolean
  avatar_emoji: string
  created_at: string
  deleted_at: string | null
}

export interface Booking {
  id: string
  user_id: string
  groomer_id: string
  groomer_name: string
  service: string
  dog_name: string
  dog_breed: string
  dog_size: 'small' | 'medium' | 'large'
  appointment_at: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  price: number
  notes: string
  created_at: string
  deleted_at: string | null
}

export interface Review {
  id: string
  groomer_id: string
  reviewer_name: string
  rating: number
  body: string
  dog_breed: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  role: 'owner' | 'groomer'
  created_at: string
}
