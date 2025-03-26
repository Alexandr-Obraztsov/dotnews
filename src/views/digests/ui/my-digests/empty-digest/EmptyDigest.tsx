import { PATH } from '@/shared/model'
import Link from 'next/link'
import NotFound from 'public/icons/not-found.svg'

export const EmptyDigest = () => {
	return (
		<Link
			className='mt-[20px] w-full h-[166px] bg-foreground flex items-center flex-col justify-center text-secondary gap-[10px] rounded-[12px] border border-stroke'
			href={PATH.digest.replace(':id', 'new')}
		>
			<NotFound />
			<p className='text-center'>
				У вас нет дайджестов :( <br />
				Нажмите сюда для создания
			</p>
		</Link>
	)
}
