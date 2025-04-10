'use client'

import { useParams, useRouter } from 'next/navigation'
import { Channels } from './channels/Channels'
import { Button, DigestHeader } from '@/shared/ui'
import Trash from 'public/icons/trash.svg'
import { Schedule } from './schedule/Schedule'
import {
	useDeleteDigestMutation,
	useGetDigestByIdQuery,
	useShareDigestMutation,
} from '@/entities/digest/api/digestsApi'
import { PATH } from '@/shared/model'
import { toast } from 'react-toastify'
import { ShareButton } from './share-button/ShareButton'
import { useConfirmModal, useShareMessage } from '@/shared/lib'

export const DigestPage = () => {
	const params = useParams()
	const id = params.id as string
	const router = useRouter()
	const shareMessage = useShareMessage()

	const { View, showConfirm } = useConfirmModal()

	const { data: digest = null, isLoading } = useGetDigestByIdQuery(
		{ id },
		{
			skip: id === 'new',
		}
	)
	const [deleteDigest] = useDeleteDigestMutation()
	const [shareDigest] = useShareDigestMutation()

	const handleDeleteDigest = () => {
		showConfirm('Are you sure you want to delete this digest?', confirmed => {
			if (!confirmed) return
			deleteDigest({ id: digest!.id })
				.unwrap()
				.then(() => {
					router.push(PATH.digests)
				})
		})
	}

	const handleShareDigest = () => {
		if (!digest) return
		const promise = shareDigest({ templateId: digest.id }).unwrap()
		toast.promise(promise, {
			pending: 'Creating shared digest',
			success: 'Digest is shared',
			error: 'Error while sharing digest',
		})
		promise.then(sharedDigest => {
			const url = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}?startapp=${sharedDigest.id}`
			const text = '🔥 Мой дайджест уже здесь!'
			shareMessage(url, text)
		})
	}

	return (
		<div className='p-4 bg-background flex flex-col'>
			<DigestHeader digest={digest} isLoading={isLoading} />
			<Schedule digest={digest} />
			<ShareButton onClick={handleShareDigest} />
			<Channels digest={digest} />
			<Button
				variant='error'
				sx='mt-3 w-full flex justify-center items-center gap-2 pb-4'
				onClick={handleDeleteDigest}
			>
				<Trash />
				Delete Digest
			</Button>
			{View}
		</div>
	)
}
