import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

type Props = {
	icon?: React.ReactNode
	sx?: ClassValue
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
	({ icon, sx, ...inputProps }, ref) => {
		return (
			<div
				className={cn(
					'bg-foreground p-4 border border-stroke rounded-lg flex items-center text-secondary gap-3',
					sx
				)}
			>
				{icon}
				<input
					className='w-full outline-none text-base bg-transparent'
					type='text'
					placeholder='Search...'
					ref={ref}
					{...inputProps}
				/>
			</div>
		)
	}
)

Input.displayName = 'Input'
