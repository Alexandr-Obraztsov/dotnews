import { cn } from '@/shared/lib'
import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
	open?: boolean
	children: ReactNode
	close: () => void
}

export const Modal = ({ children, close, open }: Props) => {
	const [isOpen, setIsOpen] = useState(open)
	const [isClosing, setIsClosing] = useState(false)

	const closeModal = () => {
		setIsClosing(true)
		setTimeout(() => {
			setIsOpen(false)
			setIsClosing(false)
		}, 190)
	}

	const handleClickOutside = (ev: React.MouseEvent) => {
		if (ev.target !== ev.currentTarget) return
		close()
	}

	useEffect(() => {
		if (!open && isOpen) closeModal()
		else if (open && !isOpen) setIsOpen(true)
	}, [open])

	if (!open && !isOpen) return null

	return (
		<div
			className={cn(
				'fixed inset-0 z-50 bg-black flex flex-col !bg-opacity-50 justify-center p-4',
				isClosing ? 'animate-fade-out' : 'animate-fade'
			)}
			onClick={handleClickOutside}
		>
			<div className='bg-background rounded-2xl p-6 transition-transform'>
				{children}
			</div>
		</div>
	)
}
