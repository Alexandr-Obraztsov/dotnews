import {
	Middleware,
	MiddlewareAPI,
	isRejectedWithValue,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => next => action => {
		if (isRejectedWithValue(action)) {
			toast.error('Something went wrong')
		}

		return next(action)
	}
