import { User } from '@/entities/user'

export type LoginRequest = {
	timeZoneId: string
}

export type LoginResponse = {
	firstLogin: boolean
	user: User
}
