import { PATH } from '@/shared/model'
import Link from 'next/link'
import Plus from 'public/icons/plus.svg'

export const AddDigestButton = () => {
	return (
		<Link
			className='group bg-accent-foreground p-[20px] rounded-full fixed bottom-6 right-6 text-accent'
			href={PATH.digest.replace(':id', 'new')}
		>
			<Plus />
		</Link>
	)
}
