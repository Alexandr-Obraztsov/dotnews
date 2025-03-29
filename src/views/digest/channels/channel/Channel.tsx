import { Channel as ChannelType } from '@/entities/channel'
import Image from 'next/image'
import More from 'public/icons/more.svg'

type Props = {
	channel: ChannelType
	onClickMore?: (ev: React.MouseEvent) => void
}

export const Channel = ({ channel, onClickMore }: Props) => {
	return (
		<div className='flex items-center justify-start'>
			<Image
				src={channel.imageUrl}
				alt={''}
				width={40}
				height={40}
				className='rounded-full bg-stroke'
			/>
			<span className='block text-[16px] ml-3 text-primary text-nowrap w-0 flex-1 overflow-hidden text-ellipsis'>
				{channel.title}
			</span>
			<button
				className='ml-auto text-secondary p-3 flex-shrink-0'
				onClick={onClickMore}
			>
				<More />
			</button>
		</div>
	)
}
