'use client'

import { PATH } from '@/shared/model'
import { Button, Pagination } from '@/shared/ui'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import box from 'public/images/box.png'
import news from 'public/images/news.png'
import phone from 'public/images/phone.png'
import { useState } from 'react'

const steps = [
	{
		img: phone,
		title: 'Welcome to .news',
		description:
			'Organize your Telegram channels and reduce information noise with smart digests',
	},
	{
		img: box,
		title: 'Create Smart Digests',
		description:
			'Simply add your favorite Telegram channels to a digest and receive a concise summary of all important updates in one place',
	},
	{
		img: news,
		title: 'Start Receiving News',
		description:
			'Get your personalized digest delivered right to your chat. Stay informed without the information overload',
	},
]

export const WelcomePage = () => {
	const [stepNum, setStepNum] = useState(0)
	const router = useRouter()

	const handleNext = () => {
		if (stepNum === steps.length - 1) router.push(PATH.digests)
		else setStepNum(prev => prev + 1)
	}

	const step = steps[stepNum]

	return (
		<div className='w-full h-screen p-[25px] '>
			<div className='relative w-full h-full flex flex-col items-center justify-start'>
				<Link
					href={PATH.digests}
					className='absolute top-0 right-0 text-gray-400 text-[14px]'
				>
					Skip
				</Link>
				<Image
					src={step.img}
					alt='image'
					width={256}
					height={256}
					className='size-[256px] mt-[140px]'
				/>
				<h1 className='text-primary font-bold text-[30px] mx-auto mt-[48px]'>
					{step.title}
				</h1>
				<p className='text-secondary mt-[28px] text-center text-[18px] leading-[18px] h-[100px]'>
					{step.description}
				</p>
				<Pagination
					sx='mt-[32px]'
					pagesCount={steps.length}
					currentPage={stepNum}
				/>
				<Button
					sx='w-full py-[20px] absolute bottom-0'
					variant='fulfilled'
					onClick={handleNext}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
