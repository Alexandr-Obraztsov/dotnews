'use client'

import { cn } from '@/shared/lib'
import { PATH } from '@/shared/model'
import { Button } from '@/shared/ui'
import { Loading } from '@/shared/ui/loading/Loading'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import box from 'public/animations/box.json'
import newspaper from 'public/animations/newspaper.json'
import phone from 'public/animations/phone.json'
import React, { useEffect, useState } from 'react'

const Lottie = dynamic(() => import('lottie-react'), {
	ssr: false,
	loading: () => <Loading />,
})

const steps = [
	{
		lottie: phone,
		title: (
			<>
				Welcome to
				<br />
				<span className='text-accent'>.news</span>
			</>
		),
		description: 'Organize Telegram channels and reduce noise',
	},
	{
		lottie: box,
		title: 'Create\nSmart Digests',
		description: 'Add channels to a digest and receive updates',
	},
	{
		lottie: newspaper,
		title: 'Start\nReceiving News',
		description: 'Get personalized digest delivered to your chat',
	},
]

export const WelcomePage = () => {
	const [stepNum, setStepNum] = useState(0)
	const [startX, setStartX] = useState<number | null>(null)
	const [isLayoutHydrated, setIsLayoutHydrated] = useState(false)
	const router = useRouter()

	const handleNext = () => {
		if (stepNum >= steps.length - 1) router.push(PATH.digests)
		else setStepNum(stepNum + 1)
	}

	const handlePrev = () => {
		if (stepNum === 0) return
		setStepNum(stepNum - 1)
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
			if (diff > 50) handlePrev()
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			handleNext()
		}, 10000)
		return () => clearTimeout(timer)
	}, [stepNum])

	useEffect(() => {
		setIsLayoutHydrated(true)
	}, [])

	return (
		<div
			className='w-full h-screen p-6 pt-4 flex flex-col items-center justify-end'
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
		>
			<div id='progress' className='top-0 flex flex-row gap-1 w-full'>
				{steps.map((_, index) => (
					<div
						key={index}
						className={cn(
							'flex-1 h-[3px] rounded-full bg-stroke after:block after:content-[""] after:w-0 after:h-full after:bg-primary after:transition-[width] after:duration-[10000ms] after:ease-linear after:rounded-full',
							index !== stepNum && 'after:transition-none after:w-0',
							index < stepNum && 'bg-primary',
							index === stepNum && isLayoutHydrated && 'after:w-full'
						)}
					/>
				))}
			</div>
			<Lottie
				animationData={step.lottie}
				className='h-0 flex-1  my-4'
				rendererSettings={{
					progressiveLoad: true,
				}}
			/>
			<h1 className='whitespace-pre-wrap w-full text-left shrink-0 mb-4 text-primary font-bold text-3xl select-none'>
				{step.title}
			</h1>
			<p className='text-left font-sans font-medium shrink-0 mb-8 text-secondary text-lg leading-[24px] select-none'>
				{step.description}
			</p>
			<Button
				sx='shrink-0 w-full py-[20px]'
				variant='fulfilled'
				onClick={handleNext}
			>
				{stepNum === steps.length - 1 ? 'Get Started' : 'Next'}
			</Button>
		</div>
	)
}
