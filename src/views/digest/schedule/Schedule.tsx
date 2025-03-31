import { useWebApp } from '@/app/hooks/useWebApp'
import { Digest, encodeReceptionDays } from '@/entities/digest'
import { useUpdateDigestMutation } from '@/entities/digest/api/digestsApi'
import { decodeReceptionDays } from '@/entities/digest/lib/decodeReceptionDays'
import { cn } from '@/shared/lib'
import { Nullable } from '@/shared/model'
import { Modal } from '@/shared/ui'
import Clock from 'public/icons/clock.svg'
import { useEffect, useState } from 'react'

type Props = {
	digest: Nullable<Digest>
}

export const Schedule = ({ digest }: Props) => {
	const webApp = useWebApp()

	const [isDeliveryTimeOpen, setDeliveryTimeOpen] = useState(false)

	const [receptionDays, setReceptionDays] = useState(Array(7).fill(false))

	const [timer, setTimer] = useState<NodeJS.Timeout>()

	const [updateDigest] = useUpdateDigestMutation()

	const handleClickDeliveryTime = () => {
		setDeliveryTimeOpen(true)
	}

	const handleCloseDeliveryTime = () => {
		setDeliveryTimeOpen(false)
	}

	const handleClickDay = (index: number) => () => {
		const newReceptionDays = [...receptionDays]
		newReceptionDays[index] = !newReceptionDays[index]
		setReceptionDays(newReceptionDays)

		clearTimeout(timer)
		const timeout = setTimeout(() => {
			updateDigest({
				digestId: digest!.id,
				receptionDaysEncoded: encodeReceptionDays(newReceptionDays),
			})
		}, 3000)
		setTimer(timeout)
	}

	useEffect(() => {
		if (digest) {
			setReceptionDays(decodeReceptionDays(digest.receptionDaysEncoded))
		}
	}, [digest])

	useEffect(() => {
		if (webApp && digest) {
			const callback = () => {
				if (digest.receptionDaysEncoded === encodeReceptionDays(receptionDays))
					return
				clearTimeout(timer)
				updateDigest({
					digestId: digest.id,
					receptionDaysEncoded: encodeReceptionDays(receptionDays),
				})
			}
			webApp.onEvent('backButtonClicked', callback)
			return () => webApp.offEvent('backButtonClicked', callback)
		}
	}, [webApp, timer, digest, receptionDays, updateDigest])

	return (
		<div className='rounded-lg bg-foreground p-4 flex flex-col gap-4 shadow-sm'>
			<h2 className='text-[14px] text-secondary'>Schedule</h2>

			<div
				className='flex items-center text-primary'
				onClick={handleClickDeliveryTime}
			>
				<Clock />
				<span className='ml-2 text-base'>Delivery Time</span>
				<span className='ml-auto text-accent font-medium'>9:00</span>
			</div>

			<div className='flex justify-between'>
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
					<button
						key={day}
						onClick={handleClickDay(i)}
						className={cn(
							'relative overflow-hidden size-10 text-sm rounded-full font-medium !bg-opacity-15 bg-gray-500 flex items-center justify-center transition-all duration-300',
							receptionDays[i]
								? 'text-accent dark:text-white'
								: 'text-secondary'
						)}
					>
						<span
							className={cn(
								'absolute bg-accent-foreground dark:bg-accent transition-all rounded-full duration-300 z-0',
								receptionDays[i] ? 'size-full' : 'size-0'
							)}
						></span>
						<span className='z-10 absolute'>{day}</span>
					</button>
				))}
			</div>

			<Modal close={handleCloseDeliveryTime} open={isDeliveryTimeOpen}>
				dfssd
			</Modal>
		</div>
	)
}
