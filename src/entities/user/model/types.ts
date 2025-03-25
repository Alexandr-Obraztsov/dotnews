import { Digest } from '@/entities/digest'

export type User = {
	id: string
	telegramId: string
	timeZoneId: string
	createdAt: string
	digestsTemplates: Digest[]
}
