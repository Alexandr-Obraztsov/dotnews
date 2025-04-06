import { Nullable } from '@/shared/model'
import { SharedDigest } from '@/entities/digest/model/types'
import { Channel } from '@/entities/channel'

type Props = {
	sharedDigest: Nullable<SharedDigest>
}

export const Channels = ({ sharedDigest }: Props) => {
	return (
		<div className='bg-foreground p-4 shadow-sm rounded-lg'>
			<h2 className='text-[14px] text-secondary'>Channels</h2>
			{sharedDigest && sharedDigest.channels.length > 0 && (
				<div className='mt-4 flex flex-col gap-4'>
					{sharedDigest.channels.map(channel => (
						<Channel key={channel.id} channel={channel} />
					))}
				</div>
			)}
		</div>
	)
}
