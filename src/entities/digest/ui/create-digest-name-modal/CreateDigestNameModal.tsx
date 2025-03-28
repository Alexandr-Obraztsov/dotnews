import { Button, Input, Modal } from '@/shared/ui'
import Close from 'public/icons/close.svg'
import { useCreateDigestMutation } from '../../api/digestsApi'
import { PATH } from '@/shared/model'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
type Props = {
	open?: boolean
	close: () => void
}

export const CreateDigestNameModal = ({ open, close }: Props) => {
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement>(null)
	const [createDigest] = useCreateDigestMutation()

	const handleCreateDigest = () => {
		createDigest({
			iconName: 'default',
			receptionDaysEncoded: '1111111',
			receptionTime: '10:00',
			name: inputRef.current!.value,
		})
			.unwrap()
			.then(data => {
				router.replace(PATH.digest.replace(':id', data.id))
			})
	}

	return (
		<Modal open={open} close={close}>
			<div className='flex items-center justify-between font-semibold text-xl'>
				Create New Digest
				<Close onClick={close} />
			</div>
			<label className='flex flex-col gap-[6px] mt-6 text-sm font-medium text-secondary'>
				Digest Name
				<Input
					placeholder='Enter Digest Name'
					ref={inputRef}
					onEnter={handleCreateDigest}
				/>
			</label>
			<Button variant='fulfilled' sx='mt-4 w-full' onClick={handleCreateDigest}>
				Create Digest
			</Button>
		</Modal>
	)
}
