import { useEffect, useRef } from 'react'
import Trash from 'public/icons/trash.svg'

type Props = {
	position: { x: number; y: number }
	close: () => void
	open?: boolean
	onDelete?: () => void
}

export const ChannelModal = ({ position, close, open, onDelete }: Props) => {
	const modalRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				close()
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('scroll', close)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.addEventListener('scroll', close)
		}
	}, [open, close])

	if (!open) return null

	return (
		<div
			ref={modalRef}
			className='fixed cursor-pointer z-10 text-red -translate-x-full flex items-center gap-2 p-[12px_16px] bg-foreground shadow-md rounded-lg border-stroke border'
			onClick={onDelete}
			style={{ left: position.x, top: position.y }}
		>
			<Trash />
			Delete
		</div>
	)
}
