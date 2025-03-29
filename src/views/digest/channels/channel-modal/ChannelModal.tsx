import { useEffect } from 'react'
import Trash from 'public/icons/trash.svg'

type Props = {
	position: { x: number; y: number }
	close: () => void
	open?: boolean
	onDelete?: () => void
}

export const ChannelModal = ({ position, close, open, onDelete }: Props) => {
	const handleClickOutside = (event: React.MouseEvent) => {
		if (event.target === event.currentTarget) {
			close()
		}
	}

	useEffect(() => {
		if (open) document.addEventListener('scroll', close)

		return () => document.addEventListener('scroll', close)
	}, [open, close])

	if (!open) return null

	return (
		<div
			className='fixed w-full h-screen inset-0 z-50'
			onClick={handleClickOutside}
		>
			<div
				className='fixed cursor-pointer z-10 text-red -translate-x-full flex items-center gap-2 p-[12px_16px] bg-foreground shadow-md rounded-lg border-stroke border'
				onClick={onDelete}
				style={{ left: position.x, top: position.y }}
			>
				<Trash />
				Delete
			</div>
		</div>
	)
}
