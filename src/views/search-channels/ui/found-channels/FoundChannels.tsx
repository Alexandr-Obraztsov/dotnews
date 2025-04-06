import { Channel, ChannelType } from '@/entities/channel'
import { LoadingChannel } from './loadingChannel/LoadingChannel'
import { Digest } from '@/entities/digest'
import { Nullable } from '@/shared/model'
import {
	useAddChannelToDigestMutation,
	useDeleteChannelFromDigestMutation,
} from '@/entities/digest/api/digestsApi'
import { cn } from '@/shared/lib'

type Props = {
	channels: Nullable<ChannelType[]>
	isLoading: boolean
	digest: Nullable<Digest>
}

export const FoundChannels = ({ channels, isLoading, digest }: Props) => {
	const [addChannel] = useAddChannelToDigestMutation()
	const [deleteChannel] = useDeleteChannelFromDigestMutation()

	const isChannelAdded = (channel: ChannelType) =>
		!!digest?.channels.find(c => c.telegramName === channel.telegramName)

	const handleClickChannel = (channel: ChannelType) => () => {
		if (isChannelAdded(channel))
			deleteChannel({ channelId: channel.id, digestId: digest!.id })
		else addChannel({ channelName: channel.telegramName, digestId: digest!.id })
	}

	return (
		<div className='p-4 rounded-s-lg bg-foreground shadow-sm mt-6'>
			<h2 className='text-sm text-secondary'>Found Channels</h2>
			<div className='flex flex-col gap-4 mt-4'>
				{!isLoading && channels ? (
					channels?.map(channel => (
						<Channel
							key={channel.id}
							channel={channel}
							additionalBtn={
								<button
									onClick={handleClickChannel(channel)}
									className={cn(
										isChannelAdded(channel)
											? 'bg-red-foreground text-red'
											: 'bg-accent-foreground text-accent dark:bg-accent dark:text-white',
										'ml-auto shrink-0 min-w-20 p-[8px_16px] !bg-opacity-25 rounded-full font-medium text-sm'
									)}
								>
									{isChannelAdded(channel) ? 'Delete' : 'Add'}
								</button>
							}
						/>
					))
				) : (
					<LoadingChannel />
				)}
			</div>
		</div>
	)
}
