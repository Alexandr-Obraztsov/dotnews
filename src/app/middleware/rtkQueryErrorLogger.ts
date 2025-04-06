import {
	Middleware,
	MiddlewareAPI,
	isRejectedWithValue,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			const payload = action.payload as { status: string; detail: string }
			if (payload.status === 'FETCH_ERROR') toast.error('Fetch error')
			else if (payload.status === 'NETWORK_ERROR')
				toast.error('No internet connection')
		}

		return next(action)
	}
