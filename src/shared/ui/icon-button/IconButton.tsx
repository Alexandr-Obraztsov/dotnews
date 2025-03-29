import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRef } from 'react'

type Props = {
	href?: Url
	className?: ClassValue
	children?: React.ReactNode
	onClick?: () => void
}

export const IconButton = ({ className, children, href, onClick }: Props) => {
	const spanRef = useRef<HTMLSpanElement>(null)

	const handleClick = () => {
		spanRef!.current!.animate(
			{ scale: [0, 1], '--tw-bg-opacity': [0, 0.2, 0.1, 0] },
			{ duration: 250 }
		)
		onClick?.()
	}

	const button = (
		<button
			className={cn(
				'cursor-pointer relative overflow-hidden flex justify-center items-center',
				className
			)}
			onClick={handleClick}
		>
			{children}
			<span
				id='effects'
				ref={spanRef}
				className='absolute w-full h-full bg-gray-200 bg-opacity-0 rounded-full'
			></span>
		</button>
	)

	if (href) return <Link href={href}>{button}</Link>
	return button
}
