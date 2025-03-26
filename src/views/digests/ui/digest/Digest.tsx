import {
	convertReceptionDateToText,
	decodeReceptionDays,
	Digest as DigestType,
} from '@/entities/digest'
import { PATH } from '@/shared/model'
import Image from 'next/image'
import Link from 'next/link'

export const Digest = (digest: DigestType) => {
	return (
		<Link
			href={PATH.digest.replace(':id', digest.id)}
			className='block shrink-0 w-[150px] grow-[1] bg-foreground p-[25px] border-stroke border rounded-xl'
		>
			<h2 className='text-[18px] font-medium text-primary leading-none'>
				{digest.name}
			</h2>
			<span className=' block mt-[8px] text-secondary text-[14px] leading-none'>
				{convertReceptionDateToText(
					decodeReceptionDays(digest.receptionDaysEncoded),
					digest.receptionTime
				)}
			</span>

			<div className='mt-[16px] flex flex-row'>
				{digest.channels.map(channel => (
					<Image
						priority
						src={channel.imageUrl}
						alt={channel.title}
						key={channel.id}
						width={40}
						height={40}
						className='ml-[-12px] first:ml-0 block rounded-full size-[40px] bg-background'
					/>
				))}
			</div>
		</Link>
	)
}
