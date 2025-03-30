import { PATH } from '@/shared/model'
import { Button } from '@/shared/ui'
import Digest from 'public/icons/digest.svg'
import Plus from 'public/icons/plus.svg'

export const EmptyDigest = () => {
	return (
		<div id='container' className='flex flex-col items-center'>
			<div
				id='icon'
				className='size-24 rounded-full bg-accent-foreground flex items-center justify-center text-accent'
			>
				<Digest />
			</div>
			<h1 className='mt-6 font-semibold text-xl'>No Digests Yet</h1>
			<p className='mt-4 text-center text-secondary'>
				Create your first digest to start collecting and organizing your content
			</p>
			<Button
				variant='fulfilled'
				href={PATH.digest.replace(':id', 'new')}
				sx='rounded-full p-[17px_24px] mt-8'
			>
				<Plus />
				<span className='text-base'>Create First Digest</span>
			</Button>
		</div>
	)
}
