import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'
import Link from 'next/link'
import React, { ButtonHTMLAttributes, ReactNode, useRef } from 'react'

type Props = {
	children: ReactNode
	variant?: 'fulfilled' | 'error' | 'outline' | 'text'
	sx?: ClassValue
	href?: string
	onClick?: () => void
	effectSx?: ClassValue
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
	children,
	variant = 'fulfilled',
	sx,
	href,
	onClick,
	effectSx: effectColor,
	...props
}: Props) => {
	const effectRef = useRef<HTMLSpanElement>(null)

	const handleClick = (ev: React.MouseEvent) => {
		const position = ev.currentTarget.getBoundingClientRect()

		effectRef!.current!.style.setProperty(
			'left',
			`${ev.clientX - position.left}px`
		)
		effectRef!.current!.style.setProperty(
			'top',
			`${ev.clientY - position.top}px`
		)
		effectRef!.current!.animate(
			{
				width: ['0', '500px'],
				height: ['0', '500px'],
			},
			{ duration: 550, easing: 'ease-out' }
		)
		effectRef!.current!.animate(
			{
				opacity: [0.2, 0],
			},
			{ duration: 550, easing: 'ease-out', fill: 'forwards' }
		)
		onClick?.()
	}

	const button = (
		<button
			className={cn(
				'text-base font-medium rounded-lg p-4 flex flex-row items-center gap-2 justify-center relative overflow-hidden',
				variant === 'fulfilled' && 'bg-accent text-white',
				variant === 'outline' &&
					'border-2 border-stroke text-accent border-dashed',
				variant === 'error' &&
					'border-2 border-red-foreground border-dashed text-red',
				variant === 'text' && 'text-accent p-0 active:opacity-80',
				sx
			)}
			{...props}
			onClick={handleClick}
		>
			<span
				ref={effectRef}
				className={cn(
					'absolute rounded-full -translate-x-1/2 -translate-y-1/2 block',
					variant === 'fulfilled' && 'bg-white',
					variant === 'outline' && 'bg-gray-300',
					variant === 'error' && 'bg-rose-300',
					effectColor
				)}
			></span>
			{children}
		</button>
	)

	return href ? <Link href={href}>{button}</Link> : button
}
