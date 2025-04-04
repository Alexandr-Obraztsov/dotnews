import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api'
import { rtkQueryErrorLogger } from '@/app/middleware/rtkQueryErrorLogger'

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware()
			.concat(baseApi.middleware)
			.concat(rtkQueryErrorLogger)
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
