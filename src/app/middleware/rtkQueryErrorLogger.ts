import {
	Middleware,
	MiddlewareAPI,
	isRejectedWithValue,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			const status = (action.payload as { status: string }).status
			if (status === 'FETCH_ERROR') toast.error('Fetch error')
			else toast.error(JSON.stringify(action))
		}

		return next(action)
	}
