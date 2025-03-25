import Plus from 'public/icons/plus.svg'

type Props = {
	onClick?: () => void
}

export const AddDigestButton = ({ onClick }: Props) => {
	return (
		<button
			className='group bg-accent p-[20px] rounded-full fixed bottom-6 right-6 text-white'
			onClick={onClick}
		>
			<Plus />
		</button>
	)
}
