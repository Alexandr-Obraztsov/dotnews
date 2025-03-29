import { PATH } from '@/shared/model'
import { IconButton } from '@/shared/ui/icon-button/IconButton'
import Plus from 'public/icons/plus.svg'

export const AddDigestButton = () => {
	return (
		<IconButton
			href={PATH.digest.replace(':id', 'new')}
			className='group bg-accent p-[20px] rounded-full fixed bottom-6 right-6 text-white'
		>
			<Plus />
		</IconButton>
	)
}
