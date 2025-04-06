import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

type Props = {
	onEnter?: () => void
	icon?: React.ReactNode
	sx?: ClassValue
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
	({ onEnter, icon, sx, ...inputProps }, ref) => {
		const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') onEnter?.()
		}

		return (
			<div
				className={cn(
					'bg-foreground px-4 py-3 border border-stroke rounded-lg flex items-center text-secondary gap-3',
					sx
				)}
			>
				{icon}
				<input
					className='w-full outline-none text-base bg-transparent'
					type='text'
					placeholder='Search...'
					ref={ref}
					onKeyUp={handleEnter}
					{...inputProps}
				/>
			</div>
		)
	}
)

Input.displayName = 'Input'
