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
import { useConfirmModal } from '@/shared/lib'

type Props = {
	digest: Nullable<Digest>
}

export const Channels = ({ digest }: Props) => {
	const { View, showConfirm } = useConfirmModal()
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
		showConfirm(
			'Are you sure you want to delete this channel from digest? ',
			confirmed => {
				if (!confirmed) return
				deleteChannel({ channelId: activeChannel!.id, digestId: digest!.id })
			}
		)
	}

	return (
		<div className='mt-3 bg-foreground px-4 py-3 shadow-sm rounded-lg'>
			<h2 className='text-xs text-secondary'>Channels</h2>
			<Link href={PATH.searchChannels.replace(':id', digest?.id || '')}>
				<Button
					variant='outline'
					sx='w-full mt-2 flex justify-center items-center gap-2'
				>
					<Plus />
					Add Channel
				</Button>
			</Link>

			{digest && digest.channels.length > 0 && (
				<div className='mt-4 flex flex-col gap-1'>
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
			{View}
		</div>
	)
}
