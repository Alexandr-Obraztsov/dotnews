import { Channel } from '@/entities/channel'

export type Digest = {
	id: string
	name: string
	iconName: string
	receptionDaysEncoded: string
	receptionTime: string
	nextAt: string
	createdAt: string
	updatedAt: string
	userId: string
	channels: Channel[]
}

export type DigestIdRequest = {
	id: string
}

export type CreateDigestRequest = {
	name: string
	iconName: string
	receptionDaysEncoded: string
	receptionTime: string
}

export type UpdateDigestRequest = {
	digestId: string
	name?: string
	iconName?: string
	receptionDaysEncoded?: string
	receptionTime?: string
}

export type AddChannelToDigestRequest = {
	digestId: string
	channelName: string
}

export type DeleteChannelFromDigestRequest = {
	digestId: string
	channelId: string
}
