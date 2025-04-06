export type ChannelType = {
	id: string
	telegramName: string
	title: string
	createdAt: string
	lastMessageId: number
	imageUrl: string
}

export type SearchChannelRequest = {
	name: string
}
