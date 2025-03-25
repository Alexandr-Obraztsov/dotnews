'use client'

import { cn } from '@/shared/lib'
import { ClassValue } from 'clsx'

type Props = {
	pagesCount: number
	currentPage: number
	sx?: ClassValue
	onClick?: (index: number) => void
}

export const Pagination = ({ pagesCount, currentPage, sx, onClick }: Props) => {
	const handleClick = (index: number) => () => {
		onClick?.(index)
	}

	return (
		<div className={cn('mx-auto w-min flex gap-[8px]', sx)}>
			{Array(pagesCount)
				.fill(null)
				.map((_, index) => (
					<div
						key={index}
						onClick={handleClick(index)}
						className={`w-[8px] h-[8px] rounded-full ${
							index === currentPage ? 'bg-accent' : 'bg-stroke'
						}`}
					></div>
				))}
		</div>
	)
}
