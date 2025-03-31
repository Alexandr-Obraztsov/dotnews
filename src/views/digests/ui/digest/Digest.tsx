import { decodeReceptionDays, Digest as DigestType } from '@/entities/digest'
import { cn } from '@/shared/lib'
import { PATH } from '@/shared/model'
import { IconButton } from '@/shared/ui/icon-button/IconButton'
import Image from 'next/image'
import Link from 'next/link'
import More from 'public/icons/more.svg'
import Empty from 'public/icons/empty.svg'

export const Digest = (digest: DigestType) => {
	const receptionDays = decodeReceptionDays(digest.receptionDaysEncoded)

	return (
		<Link
			href={PATH.digest.replace(':id', digest.id)}
			className='block w-full bg-foreground p-6 border border-stroke shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl'
		>
			<div className='flex flex-row justify-between items-center'>
				<h2
					id='title'
					className='text-lg font-medium text-primary leading-[21px]'
				>
					{digest.name}
				</h2>
				<div
					id='time'
					className='flex flex-row items-center gap-1 text-secondary text-xs leading-none'
				>
					<span
						className={cn(
							'size-2 bg-green-400 rounded-full block',
							+digest.receptionTime.split(':')[0] > 12
								? 'bg-green-400'
								: 'bg-yellow-400',
							digest.channels.length === 0 && '!bg-secondary'
						)}
					></span>
					{digest.channels.length > 0
						? digest.receptionTime.slice(0, -3)
						: 'New'}
				</div>
			</div>

			<div id='schedule' className='mt-5 flex flex-row gap-[6px]'>
				{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
					<span
						key={day}
						className={cn(
							'size-6 rounded-full flex items-center justify-center text-xs',
							receptionDays[i]
								? 'text-white bg-accent'
								: 'text-secondary bg-gray-400 !bg-opacity-15'
						)}
					>
						{day}
					</span>
				))}
			</div>

			<div className='mt-6 flex flex-row items-center justify-between'>
				<div className='flex flex-row'>
					{digest.channels.length > 0 ? (
						digest.channels.map(channel => (
							<Image
								src={channel.imageUrl}
								alt={''}
								key={channel.id}
								width={32}
								height={32}
								className='border-4 border-foreground ml-[-12px] first:ml-0 block rounded-full size-[40px] bg-background'
							/>
						))
					) : (
						<div className='flex flex-row gap-2 items-center text-secondary text-sm leading-none'>
							<Empty />
							Add channels
						</div>
					)}
				</div>
				<IconButton>
					<More />
				</IconButton>
			</div>
		</Link>
	)
}
