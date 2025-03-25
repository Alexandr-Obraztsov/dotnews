'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/store'

type Props = {
	children: ReactNode
}

export const StoreProvider = ({ children }: Props) => {
	return <Provider store={store}>{children}</Provider>
}
