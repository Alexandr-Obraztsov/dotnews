import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
		prepareHeaders: headers => {
			if (typeof window !== 'undefined') {
				const initData = localStorage.getItem('tgInitData')
				if (initData) {
					headers.set('Authorization', `TMiniApp ${initData}`)
				}
			}
			return headers
		},
	}),
	tagTypes: ['Digests'],
	endpoints: () => ({}),
})
