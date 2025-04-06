import Edit from 'public/icons/edit.svg'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Digest } from '@/entities/digest'
import { Nullable } from '@/shared/model'
import { useUpdateDigestMutation } from '@/entities/digest/api/digestsApi'
import { CreateDigestNameModal } from '@/entities/digest/ui/create-digest-name-modal/CreateDigestNameModal'
import { useWebApp } from '@/app/hooks/useWebApp'
import { IconButton } from '../icon-button/IconButton'

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
	const webApp = useWebApp()

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

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handleEditDigestName()
	}

	useEffect(() => {
		if (webApp) {
			webApp.BackButton.onClick(router.back)
			webApp.BackButton.show()
		}
	}, [webApp, router.back])

	return (
		<header className='bg-foreground text-primary font-semibold px-4 pt-4 shadow-sm rounded-t-lg'>
			<h2 className='text-xs text-secondary font-normal'>Name</h2>
			<div className='flex gap-4 justify-start items-center'>
				<div className='flex-1 flex items-center text-lg'>
					{digest ? (
						isTitleEditing ? (
							<input
								defaultValue={digest.name}
								ref={inputRef}
								type='text'
								className='bg-transparent outline-none flex-1 w-0 border-b border-stroke text-nowrap'
								autoFocus
								onBlur={handleEditDigestName}
								onKeyUp={handleEnter}
							/>
						) : (
							<span className='overflow-hidden text-ellipsis text-wrap w-0 flex-1'>
								{digest.name}
							</span>
						)
					) : (
						'New Digest'
					)}
				</div>

				<IconButton
					onClick={isTitleEditing ? handleEditDigestName : handleClickEdit}
					className='size-8 shrink-0 flex justify-center items-center text-accent'
				>
					<Edit className='size-3' />
				</IconButton>
			</div>
			<CreateDigestNameModal open={isModalOpen} close={handleCloseModal} />
		</header>
	)
}
