import { Channel as ChannelType } from '@/entities/channel'
import { cn } from '@/shared/lib'
import Image from 'next/image'

type Props = {
	channel: ChannelType
	added?: boolean
	onClick?: () => void
}

export const Channel = ({ channel, added, onClick }: Props) => {
	return (
		<div className='flex items-center'>
			<Image
				src={channel.imageUrl}
				alt={channel.title}
				width={40}
				height={40}
				className='rounded-full bg-stroke shrink-0'
			/>
			<div className='flex flex-col items-start w-0 flex-1 ml-3 overflow-hidden'>
				<h1 className='text-primary text-nowrap overflow-hidden w-full text-ellipsis'>
					{channel.title}
				</h1>
				<span className='text-secondary text-sm'>@{channel.telegramName}</span>
			</div>
			<button
				onClick={onClick}
				className={cn(
					added
						? 'bg-red-foreground text-red'
						: 'bg-accent-foreground text-accent dark:bg-accent dark:text-white',
					'ml-auto shrink-0 min-w-20 p-[8px_16px] !bg-opacity-25 rounded-full font-medium text-sm'
				)}
			>
				{added ? 'Delete' : 'Add'}
			</button>
		</div>
	)
}
