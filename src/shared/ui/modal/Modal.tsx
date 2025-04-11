import { cn } from '@/shared/lib'
import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

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
	}, [open, isOpen])

	if ((!open && !isOpen) || !document) return null

	return createPortal(
		<div
			className={cn(
				'absolute inset-0 z-50 bg-black flex flex-col !bg-opacity-50 justify-center p-4',
				isClosing && 'animate-fade-out'
			)}
			onClick={handleClickOutside}
		>
			<div className='relative text-primary bg-foreground rounded-lg px-4 pt-3 pb-2  transition-transform'>
				{children}
			</div>
		</div>,
		document.body
	)
}
