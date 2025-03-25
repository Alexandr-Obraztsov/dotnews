import { baseApi } from '@/shared/api'
import { Channel, SearchChannelRequest } from '../model/types'

export const channelsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		searchChannel: build.query<Channel[], SearchChannelRequest>({
			query: params => ({
				url: `/channels/search`,
				params,
			}),
		}),
	}),
})

export const { useSearchChannelQuery } = channelsApi
