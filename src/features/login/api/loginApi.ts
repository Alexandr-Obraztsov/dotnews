import { baseApi } from '@/shared/api'
import { LoginRequest, LoginResponse } from '../model/types'

export const loginApi = baseApi.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: arg => ({
				url: '/users/login',
				method: 'POST',
				body: arg,
			}),
		}),
	}),
})

export const { useLoginMutation } = loginApi
