import { useWebApp } from '@/app/hooks/useWebApp'
import { Digest, encodeReceptionDays } from '@/entities/digest'
import { useUpdateDigestMutation } from '@/entities/digest/api/digestsApi'
import { decodeReceptionDays } from '@/entities/digest/lib/decodeReceptionDays'
import { Nullable } from '@/shared/model'
import Clock from 'public/icons/clock.svg'
import { useEffect, useState } from 'react'
import { ScheduleButton } from './schedule-button/ScheduleButton'
import { TimeModal } from './time-modal/TimeModal'
import Skeleton from 'react-loading-skeleton'

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
		}, 1000)
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
		<div className='rounded-lg bg-foreground px-4 py-3 flex flex-col gap-2 shadow-sm'>
			<h2 className='text-xs text-secondary'>Schedule</h2>

			<div
				className='flex items-center text-primary mt-1 cursor-pointer'
				onClick={handleClickDeliveryTime}
			>
				<Clock />
				<span className='ml-2 text-sm'>Delivery Time</span>
				<span className='ml-auto text-accent font-medium'>
					{digest ? digest.receptionTime.slice(0, -3) : <Skeleton />}
				</span>
			</div>

			<div className='flex gap-2 mx-auto'>
				{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
					<ScheduleButton
						key={day}
						day={day}
						isActive={receptionDays[i]}
						onClick={handleClickDay(i)}
					/>
				))}
			</div>

			<TimeModal
				close={handleCloseDeliveryTime}
				open={isDeliveryTimeOpen}
				digest={digest}
			/>
		</div>
	)
}
