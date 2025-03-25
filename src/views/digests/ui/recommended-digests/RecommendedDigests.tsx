'use client'

import { Pagination } from '@/shared/ui/pagination/Pagination'
import Comming from 'public/icons/coming.svg'
import { useState } from 'react'

export const RecommendedDigests = () => {
	const [pagination, setPagination] = useState(0)

	return (
		<div className='pt-[35px]'>
			<span className='text-primary text-[18px] font-[500] leading-[18px]'>
				Recommended Digests
			</span>
			<div className='mt-[20px] w-full h-[166px] bg-foreground flex items-center flex-col justify-center text-secondary gap-[20px] rounded-[12px] border border-stroke'>
				<Comming />
				<span>Coming soon</span>
			</div>
			<Pagination
				sx='mt-[16px]'
				pagesCount={3}
				currentPage={pagination}
				onClick={setPagination}
			/>
		</div>
	)
}
