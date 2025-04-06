import { Nullable, PATH } from '@/shared/model'
import { Button } from '@/shared/ui'
import Plus from 'public/icons/plus.svg'
import { useState } from 'react'
import { ChannelModal } from './channel-modal/ChannelModal'
import { Digest } from '@/entities/digest'
import { Channel, ChannelType } from '@/entities/channel'
import { useDeleteChannelFromDigestMutation } from '@/entities/digest/api/digestsApi'
import Link from 'next/link'
import More from 'public/icons/more.svg'

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
			const position = ev.currentTarget.getBoundingClientRect()
			setModalPosition({
				x: position.x + position.width / 2 - 5,
				y: position.y + position.height / 2,
			})
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
							additionalBtn={
								<button
									className='ml-auto text-secondary p-3 flex-shrink-0'
									onClick={handleClickChannelMore(channel)}
								>
									<More />
								</button>
							}
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
