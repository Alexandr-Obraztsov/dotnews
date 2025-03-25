import { PATH } from '@/shared/model'
import { useRouter } from 'next/navigation'
import NotFound from 'public/icons/not-found.svg'

export const EmptyDigest = () => {
	const router = useRouter()

	const handleClick = () => {
		router.push(PATH.digest.replace(':id', 'new'))
	}

	return (
		<div
			className='mt-[20px] w-full h-[166px] bg-foreground flex items-center flex-col justify-center text-secondary gap-[10px] rounded-[12px] border border-stroke'
			onClick={handleClick}
		>
			<NotFound />
			<p className='text-center'>
				У вас нет дайджестов :( <br />
				Нажмите сюда для создания
			</p>
		</div>
	)
}
