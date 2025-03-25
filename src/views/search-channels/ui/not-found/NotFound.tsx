import NotFoundImage from 'public/icons/not-found.svg'

type Props = {
	searchText: string
}

export const NotFound = ({ searchText }: Props) => {
	return (
		<div className='text-secondary flex flex-col items-center mt-16'>
			<NotFoundImage />
			<h2 className='font-semibold text-xl text-primary mt-6'>
				No channels found
			</h2>
			<p className='mt-4 text-center'>
				We couldn&apos;t find any channels matching &quot;{searchText}&quot;
			</p>
		</div>
	)
}
