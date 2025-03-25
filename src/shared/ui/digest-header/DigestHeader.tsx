import Edit from 'public/icons/edit.svg'
import Back from 'public/icons/back.svg'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Digest } from '@/entities/digest'
import { Nullable } from '@/shared/model'
import { useUpdateDigestMutation } from '@/entities/digest/api/digestsApi'
import { CreateDigestNameModal } from '@/entities/digest/ui/create-digest-name-modal/CreateDigestNameModal'
type Props = {
	digest: Nullable<Digest>
	isLoading: boolean
}

export const DigestHeader = ({ digest, isLoading }: Props) => {
	const [isTitleEditing, setIsTitleEditing] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(!digest && !isLoading)
	const [updateDigest] = useUpdateDigestMutation()

	const inputRef = useRef<HTMLInputElement>(null)

	const router = useRouter()

	const handleBack = () => {
		router.back()
	}

	const handleClickEdit = () => {
		if (digest) setIsTitleEditing(true)
		else setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		if (digest) setIsModalOpen(false)
		else router.back()
	}

	const handleEditDigestName = () => {
		if (digest) {
			updateDigest({
				digestId: digest.id,
				name: inputRef.current!.value,
			})
		}
		setIsTitleEditing(false)
	}

	return (
		<header className='w-full bg-foreground text-primary font-semibold text-[24px] leading-6 p-4 flex gap-4 justify-start items-center shadow-sm rounded-lg'>
			<div
				onClick={handleBack}
				className='size-6 shrink-0 flex justify-center items-center'
			>
				<Back />
			</div>

			<div className='flex-1 flex items-center'>
				{digest ? (
					isTitleEditing ? (
						<input
							defaultValue={digest.name}
							ref={inputRef}
							type='text'
							className='h-6 outline-none flex-1 w-0 border-b border-stroke'
							autoFocus
							onBlur={handleEditDigestName}
						/>
					) : (
						digest.name
					)
				) : (
					'New Digest'
				)}
			</div>

			<div
				onClick={isTitleEditing ? handleEditDigestName : handleClickEdit}
				className='size-6 shrink-0 flex justify-center items-center text-accent'
			>
				<Edit />
			</div>
			<CreateDigestNameModal open={isModalOpen} close={handleCloseModal} />
		</header>
	)
}
