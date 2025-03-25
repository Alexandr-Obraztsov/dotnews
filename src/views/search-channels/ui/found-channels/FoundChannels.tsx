import { Channel as ChannelType } from '@/entities/channel'
import { Channel } from './channel/Channel'
import { LoadingChannel } from './loadingChannel/LoadingChannel'
import { Digest } from '@/entities/digest'
import { Nullable } from '@/shared/model'
import {
	useAddChannelToDigestMutation,
	useDeleteChannelFromDigestMutation,
} from '@/entities/digest/api/digestsApi'

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
							onClick={handleClickChannel(channel)}
							channel={channel}
							added={isChannelAdded(channel)}
						/>
					))
				) : (
					<LoadingChannel />
				)}
			</div>
		</div>
	)
}
