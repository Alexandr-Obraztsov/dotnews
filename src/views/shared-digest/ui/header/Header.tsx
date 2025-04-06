type Props = {
	title: string
}

export const Header = ({ title }: Props) => {
	return (
		<header className='w-full bg-foreground text-primary font-semibold text-[20px] leading-normal p-4 flex gap-4 justify-start items-center shadow-sm rounded-lg'>
			<div className='flex-1 flex items-center text-nowrap overflow-hidden text-ellipsis'>
				{title}
			</div>
		</header>
	)
}
