import { Digest } from '@/entities/digest'
import { useUpdateDigestMutation } from '@/entities/digest/api/digestsApi'
import { cn } from '@/shared/lib'
import { Nullable } from '@/shared/model'
import { Button, Modal } from '@/shared/ui'
import { useEffect, useState } from 'react'
import Picker from 'react-mobile-picker'

type Props = {
	open?: boolean
	close: () => void
	digest: Nullable<Digest>
}

const selections: Record<string, string[]> = {
	hour: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')),
	minute: Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')),
}

export const TimeModal = ({ open, close, digest }: Props) => {
	const [deliveryTime, setDeliveryTime] = useState({
		hour: digest?.receptionTime.split(':')[0] || '00',
		minute: digest?.receptionTime.split(':')[1] || '00',
	})

	const [updateDigest] = useUpdateDigestMutation()

	const handleDone = () => {
		updateDigest({
			digestId: digest!.id,
			receptionTime: `${deliveryTime.hour}:${deliveryTime.minute}:00`,
		})
			.unwrap()
			.then(() => close())
	}

	useEffect(() => {
		if (digest)
			setDeliveryTime({
				hour: digest.receptionTime.split(':')[0],
				minute: digest.receptionTime.split(':')[1],
			})
	}, [digest])

	return (
		<Modal close={close} open={open}>
			<div id='header' className='flex justify-between items-center pb-4'>
				<Button variant='text' sx='text-secondary' onClick={close}>
					Cancel
				</Button>
				<h1 className='text-nowrap text-primary font-semibold text-lg'>
					Delivery Time
				</h1>
				<Button variant='text' onClick={handleDone}>
					Done
				</Button>
			</div>
			<Picker
				value={deliveryTime}
				onChange={setDeliveryTime}
				wheelMode='natural'
				height={170}
				className='text-4xl flex gap-4 last-of-type:*:hidden'
				itemHeight={40}
			>
				<Picker.Column key={'hour'} name={'hour'} className='!grow-0'>
					{selections['hour'].map(option => (
						<Picker.Item
							key={option}
							value={option}
							className={cn(
								'text-secondary font-light',
								option === deliveryTime.hour && 'text-white'
							)}
						>
							{option}
						</Picker.Item>
					))}
				</Picker.Column>

				<div className='text-white flex items-center justify-center'>:</div>

				<Picker.Column key={'minute'} name={'minute'} className='!grow-0'>
					{selections['minute'].map(option => (
						<Picker.Item
							key={option}
							value={option}
							className={cn(
								'text-secondary font-light',
								option === deliveryTime.minute && 'text-white'
							)}
						>
							{option}
						</Picker.Item>
					))}
				</Picker.Column>
			</Picker>
		</Modal>
	)
}
