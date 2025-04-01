'use client'

import { PATH } from '@/shared/model'
import { Button } from '@/shared/ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import box from 'public/images/box.json'
import newspaper from 'public/images/newspaper.json'
import phone from 'public/images/phone.json'
import React, { useState } from 'react'

const Lottie = dynamic(() => import('lottie-react'), {
	ssr: false,
})

const steps = [
	{
		lottie: phone,
		title: 'Welcome to .news',
		description: 'Organize Telegram channels and reduce noise',
	},
	{
		lottie: box,
		title: 'Create Smart Digests',
		description: 'Add channels to a digest and receive updates',
	},
	{
		lottie: newspaper,
		title: 'Start Receiving News',
		description: 'Get personalized digest delivered to your chat',
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
			className='w-full h-screen p-[25px] flex flex-col items-center justify-end'
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
		>
			<div id='progress' className='top-0 flex flex-row gap-1 w-full'>
				<span className='block flex-1 h-1 rounded-full bg-accent'></span>
				<span className='block flex-1 h-1 rounded-full bg-accent'></span>
				<span className='block flex-1 h-1 rounded-full bg-stroke'></span>
			</div>
			<Lottie animationData={step.lottie} className='h-0 flex-1  my-4' />
			<h1 className='shrink-0 mb-4 text-primary font-bold text-3xl mx-auto select-none'>
				{step.title}
			</h1>
			<p className='font-sans font-medium shrink-0 mb-8 text-secondary text-center text-lg leading-[24px] select-none'>
				{step.description}
			</p>
			<Button
				sx='shrink-0 w-full py-[20px]'
				variant='fulfilled'
				onClick={handleNext}
			>
				Next
			</Button>
		</div>
	)
}
