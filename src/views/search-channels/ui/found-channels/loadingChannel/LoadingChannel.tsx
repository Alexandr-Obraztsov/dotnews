import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const LoadingChannel = () => {
	return (
		<div className='flex items-center'>
			<Skeleton width={40} height={40} circle />
			<div className='flex flex-col items-start ml-3'>
				<Skeleton width={140} />
				<Skeleton width={120} />
			</div>
			<div className='ml-auto'>
				<Skeleton width={80} height={35} borderRadius={5999} />
			</div>
		</div>
	)
}
