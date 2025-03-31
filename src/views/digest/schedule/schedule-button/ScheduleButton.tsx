import { cn } from '@/shared/lib'
import { useRef } from 'react'

type Props = {
	day: string
	isActive: boolean
	onClick: () => void
}

export const ScheduleButton = ({ day, isActive, onClick }: Props) => {
	const spanRef = useRef<HTMLSpanElement>(null)

	const handleClick = (ev: React.MouseEvent) => {
		const position = ev.currentTarget.getBoundingClientRect()

		spanRef!.current!.style.setProperty(
			'left',
			`${ev.clientX - position.left}px`
		)
		spanRef!.current!.style.setProperty('top', `${ev.clientY - position.top}px`)
		onClick?.()
	}

	return (
		<button
			onClick={handleClick}
			className={cn(
				'relative overflow-hidden size-10 text-sm rounded-full font-medium !bg-opacity-15 bg-gray-500 flex items-center justify-center transition-all duration-300',
				isActive ? 'text-accent dark:text-white' : 'text-secondary'
			)}
		>
			<span
				ref={spanRef}
				className={cn(
					'left-1/2 top-1/2 absolute bg-accent-foreground dark:bg-accent transition-[width,height] rounded-full duration-300 z-0 -translate-x-1/2 -translate-y-1/2',
					isActive ? 'size-[200%]' : 'size-0'
				)}
			></span>
			<span className='z-10 absolute'>{day}</span>
		</button>
	)
}
