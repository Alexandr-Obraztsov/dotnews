import { ChannelType } from '@/entities/channel'
import Image from 'next/image'

type Props = {
	channel: ChannelType
	additionalBtn?: React.ReactNode
}

export const Channel = ({ channel, additionalBtn }: Props) => {
	return (
		<div className='flex items-center justify-start'>
			<Image
				src={channel.imageUrl}
				alt={''}
				width={30}
				height={30}
				className='rounded-full bg-stroke'
			/>
			<span className='block text-sm font-medium ml-3 text-primary text-nowrap w-0 flex-1 overflow-hidden text-ellipsis'>
				{channel.title}
			</span>
			{additionalBtn}
		</div>
	)
}
