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
				className='rounded-full bg-stroke'
			/>
			<div className='flex flex-col items-start ml-3'>
				<span className='text-primary'>{channel.title}</span>
				<span className='text-secondary text-sm'>@{channel.telegramName}</span>
			</div>
			<button
				onClick={onClick}
				className={cn(
					added
						? 'bg-red-foreground text-red'
						: 'bg-accent-foreground text-accent dark:bg-accent dark:text-white',
					'ml-auto min-w-20 p-[8px_16px] !bg-opacity-25 rounded-full font-medium text-sm'
				)}
			>
				{added ? 'Delete' : 'Add'}
			</button>
		</div>
	)
}
