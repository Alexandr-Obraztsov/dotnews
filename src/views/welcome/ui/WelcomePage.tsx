'use client'

import { PATH } from '@/shared/model'
import { Button, Pagination } from '@/shared/ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import box from 'public/images/box.png'
import news from 'public/images/news.png'
import phone from 'public/images/phone.png'
import React, { useState } from 'react'

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
	const [startX, setStartX] = useState<number | null>(null)
	const router = useRouter()

	const handleNext = () => {
		if (stepNum === steps.length - 1) router.push(PATH.digests)
		else setStepNum(prev => prev + 1)
	}

	const step = steps[stepNum]

	const handleTouchStart = (event: React.TouchEvent) => {
		setStartX(event.touches[0].clientX)
	}

	const handleTouchMove = (event: React.TouchEvent) => {
		if (startX === null) return
		const currentX = event.touches[0].clientX
		const diff = currentX - startX

		console.log(diff)
		if (Math.abs(diff) > 50) {
			setStartX(null)
			if (diff < -50) handleNext()
			if (diff > 50) setStepNum(prev => (prev > 0 ? prev - 1 : 0))
		}
	}

	return (
		<div
			className='w-full h-screen p-[25px] '
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
		>
			<div className='relative w-full h-full flex flex-col items-center justify-start'>
				<Image
					src={step.img}
					alt='image'
					width={256}
					height={256}
					className='size-[256px]'
				/>
				<h1 className='text-primary font-bold text-xl mx-auto mt-[24px] select-none'>
					{step.title}
				</h1>
				<p className='text-secondary text-balance mt-[28px] text-center text-base leading-[18px] h-[60px] select-none'>
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
