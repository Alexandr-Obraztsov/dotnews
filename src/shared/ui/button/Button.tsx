import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
	children: ReactNode
	variant?: 'fulfilled' | 'error' | 'outline'
	sx?: ClassValue
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
	children,
	variant = 'fulfilled',
	sx,
	...props
}: Props) => {
	return (
		<button
			className={cn(
				'text-base font-medium rounded-lg p-4',
				variant === 'fulfilled' && 'bg-accent text-white',
				variant === 'outline' &&
					'border-2 border-stroke text-accent border-dashed',
				variant === 'error' &&
					'border-2 border-red-300 border-dashed text-red-600',
				sx
			)}
			{...props}
		>
			{children}
		</button>
	)
}
