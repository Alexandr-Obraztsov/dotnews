import { useState } from 'react'
import { IconButton } from '../ui/icon-button/IconButton'
import { Modal } from '../ui/modal/Modal'
import Close from 'public/icons/close.svg'
import { Button } from '../ui'

export const useConfirmModal = () => {
	const [open, setOpen] = useState(false)
	const [onConfirm, setOnConfirm] = useState<
		((confirmed: boolean) => void) | null
	>(null)
	const [message, setMessage] = useState('')

	const handleClose = () => {
		setOpen(false)
		onConfirm?.(false)
	}

	const handleConfirm = () => {
		setOpen(false)
		onConfirm?.(true)
	}

	const showConfirm = (
		message: string,
		onConfirm: (confirmed: boolean) => void
	) => {
		setOnConfirm(() => onConfirm)
		setMessage(message)
		setOpen(true)
	}

	return {
		View: (
			<Modal open={open} close={handleClose}>
				<div className='p-1'>
					<IconButton
						onClick={handleClose}
						className='absolute right-5 top-5 text-secondary hover:text-primary p-[2px]'
					>
						<Close />
					</IconButton>
					<p className='mt-4 font-light text-sm max-w-[80%]'>{message}</p>
					<div className='flex flex-row justify-end gap-2 mt-4'>
						<Button
							variant='text'
							sx='text-sm font-medium px-4 py-2 text-secondary hover:bg-gray-600 !bg-opacity-35 rounded-base'
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							variant='text'
							sx='text-sm text-secondary px-4 py-2 hover:bg-gray-600  !bg-opacity-35 rounded-base'
							onClick={handleConfirm}
						>
							Confirm
						</Button>
					</div>
				</div>
			</Modal>
		),
		showConfirm,
	}
}
