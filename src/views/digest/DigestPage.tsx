'use client'

import { useParams, useRouter } from 'next/navigation'
import { Channels } from './channels/Channels'
import { Button, DigestHeader } from '@/shared/ui'
import Share from 'public/icons/share.svg'
import Trash from 'public/icons/trash.svg'
import { Schedule } from './schedule/Schedule'
import {
	useDeleteDigestMutation,
	useGetDigestByIdQuery,
} from '@/entities/digest/api/digestsApi'
import { PATH } from '@/shared/model'

export const DigestPage = () => {
	const params = useParams()
	const id = params.id as string
	const router = useRouter()

	const { data: digest = null, isLoading } = useGetDigestByIdQuery(
		{ id },
		{
			skip: id === 'new',
		}
	)
	const [deleteDigest] = useDeleteDigestMutation()

	const handleDeleteDigest = () => {
		deleteDigest({ id: digest!.id })
			.unwrap()
			.then(() => {
				router.push(PATH.digests)
			})
	}

	return (
		<div className='p-4 bg-background flex flex-col gap-4'>
			<DigestHeader digest={digest} isLoading={isLoading} />
			<Schedule digest={digest} />
			<Button
				variant='fulfilled'
				sx='w-full flex justify-center items-center gap-2'
			>
				<Share />
				Share Digest
			</Button>
			<Channels digest={digest} />
			<Button
				variant='error'
				sx='w-full flex justify-center items-center gap-2'
				onClick={handleDeleteDigest}
			>
				<Trash />
				Delete Digest
			</Button>
		</div>
	)
}
