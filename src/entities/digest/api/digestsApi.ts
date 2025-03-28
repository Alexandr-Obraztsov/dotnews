import { baseApi } from '@/shared/api'
import {
	AddChannelToDigestRequest,
	CreateDigestRequest,
	DeleteChannelFromDigestRequest,
	Digest,
	DigestIdRequest,
	UpdateDigestRequest,
} from '../model/types'
import { Channel } from '@/entities/channel'

export const digestsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		createDigest: build.mutation<Digest, CreateDigestRequest>({
			query: arg => ({
				method: 'POST',
				body: arg,
				url: '/digests',
			}),
			invalidatesTags: ['Digests'],
		}),

		getDigests: build.query<Digest[], void>({
			query: () => ({
				url: '/digests',
			}),
			providesTags: ['Digests'],
		}),

		getDigestById: build.query<Digest, DigestIdRequest>({
			query: arg => ({
				url: `/digests/${arg.id}`,
			}),
			providesTags: ['Digests'],
		}),

		updateDigest: build.mutation<Digest, UpdateDigestRequest>({
			query: arg => ({
				url: `/digests/${arg.digestId}`,
				method: 'PATCH',
				body: arg as UpdateDigestRequest,
			}),
			invalidatesTags: ['Digests'],
			async onQueryStarted(queryArgument, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					digestsApi.util.updateQueryData(
						'getDigestById',
						{ id: queryArgument.digestId },
						draft => {
							if (queryArgument.name) draft.name = queryArgument.name
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),

		deleteDigest: build.mutation<Digest, DigestIdRequest>({
			query: arg => ({
				url: `/digests/${arg.id}`,
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					digestsApi.util.updateQueryData('getDigests', undefined, draft => {
						draft.splice(
							draft.findIndex(item => item.id === arg.id),
							1
						)
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: ['Digests'],
		}),

		addChannelToDigest: build.mutation<Digest, AddChannelToDigestRequest>({
			query: arg => ({
				url: `/digests/${arg.digestId}/channels`,
				method: 'POST',
				body: arg,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					digestsApi.util.updateQueryData(
						'getDigestById',
						{ id: arg.digestId },
						draft => {
							draft.channels.push({ telegramName: arg.channelName } as Channel)
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: ['Digests'],
		}),

		deleteChannelFromDigest: build.mutation<
			Digest,
			DeleteChannelFromDigestRequest
		>({
			query: arg => ({
				url: `/digests/${arg.digestId}/channels/${arg.channelId}`,
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					digestsApi.util.updateQueryData(
						'getDigestById',
						{ id: arg.digestId },
						draft => {
							draft.channels.splice(
								draft.channels.findIndex(item => item.id === arg.channelId),
								1
							)
						}
					)
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			invalidatesTags: ['Digests'],
		}),
	}),
})

export const {
	useCreateDigestMutation,
	useGetDigestsQuery,
	useGetDigestByIdQuery,
	useUpdateDigestMutation,
	useDeleteDigestMutation,
	useAddChannelToDigestMutation,
	useDeleteChannelFromDigestMutation,
} = digestsApi
