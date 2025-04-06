import { ChannelType } from '@/entities/channel'

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
	channels: ChannelType[]
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

export type ShareDigestRequest = {
	templateId: string
}

export type AddSharedDigestRequest = {
	sharedDigestId: string
	receptionDaysEncoded?: string
	iconName?: string
	receptionTime?: string
}

export type SharedDigest = {
	id: string
	name: string
	createdAt: string
	iconName: string
	receptionDaysEncoded: string
	receptionTime: string
	channels: ChannelType[]
}
