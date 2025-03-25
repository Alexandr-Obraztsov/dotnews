import { Nullable, PATH } from '@/shared/model'
import { Button } from '@/shared/ui'
import Plus from 'public/icons/plus.svg'
import { useState } from 'react'
import { ChannelModal } from './channel-modal/ChannelModal'
import { Digest } from '@/entities/digest'
import { Channel as ChannelType } from '@/entities/channel'
import { useDeleteChannelFromDigestMutation } from '@/entities/digest/api/digestsApi'
import { Channel } from './channel/Channel'
import Link from 'next/link'

type Props = {
	digest: Nullable<Digest>
}

export const Channels = ({ digest }: Props) => {
	const [activeChannel, setActiveChannel] =
		useState<Nullable<ChannelType>>(null)
	const [modalPosition, setModalPosition] = useState({
		x: 0,
		y: 0,
	})

	const [deleteChannel] = useDeleteChannelFromDigestMutation()

	const handleClickChannelMore =
		(channel: ChannelType) => (ev: React.MouseEvent) => {
			setActiveChannel(channel)
			setModalPosition({ x: ev.clientX, y: ev.clientY })
		}

	const handleDeleteChannel = () => {
		setActiveChannel(null)
		deleteChannel({ channelId: activeChannel!.id, digestId: digest!.id })
	}

	return (
		<div className='bg-foreground p-4 shadow-sm rounded-lg'>
			<h2 className='text-[14px] text-secondary'>Channels</h2>
			<Link href={PATH.searchChannels.replace(':id', digest?.id || '')}>
				<Button
					variant='outline'
					sx='w-full mt-3 flex justify-center items-center gap-2'
				>
					<Plus />
					Add Channel
				</Button>
			</Link>

			{digest && digest.channels.length > 0 && (
				<div className='mt-8 flex flex-col gap-4'>
					{digest.channels.map(channel => (
						<Channel
							key={channel.id}
							channel={channel}
							onClickMore={handleClickChannelMore(channel)}
						/>
					))}
				</div>
			)}
			<ChannelModal
				position={modalPosition}
				close={() => setActiveChannel(null)}
				open={!!activeChannel}
				onDelete={handleDeleteChannel}
			/>
		</div>
	)
}
