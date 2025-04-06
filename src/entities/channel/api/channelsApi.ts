import { baseApi } from '@/shared/api'
import { ChannelType, SearchChannelRequest } from '../model/types'

export const channelsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		searchChannel: build.query<ChannelType[], SearchChannelRequest>({
			query: params => ({
				url: `/channels/search`,
				params,
			}),
		}),
	}),
})

export const { useSearchChannelQuery } = channelsApi
