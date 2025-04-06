'use client'

import { PropsWithChildren } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

export const ToastProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={true}
				draggablePercent={40}
				pauseOnHover={false}
				transition={Bounce}
				className='p-4 gap-2'
				toastClassName='bg-foreground rounded-sm text-primary select-none cursor-pointer'
				closeButton={false}
			/>
			{children}
		</>
	)
}
