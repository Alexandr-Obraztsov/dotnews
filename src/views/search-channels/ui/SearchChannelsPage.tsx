import { Input } from '@/shared/ui/input/Input'
import Search from 'public/icons/search.svg'
import { useState } from 'react'
import { NotFound } from './not-found/NotFound'
import { useParams } from 'next/navigation'
import { useGetDigestByIdQuery } from '@/entities/digest/api/digestsApi'
import { useSearchChannelQuery } from '@/entities/channel/api/channelsApi'
import { FoundChannels } from './found-channels/FoundChannels'

export const SearchChannelsPage = () => {
	const params = useParams()
	const id = params.id as string

	const { data: digest } = useGetDigestByIdQuery({ id })

	const [searchText, setSearchText] = useState('')

	const {
		data: channels,
		isSuccess: isChannelSuccess,
		isFetching: isChannelFetching,
	} = useSearchChannelQuery(
		{
			name: searchText,
		},
		{
			skip: !searchText,
		}
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value)
	}

	return (
		<div className='p-4'>
			<Input
				value={searchText}
				icon={<Search />}
				placeholder='Search channels...'
				onChange={handleChange}
			/>
			{isChannelSuccess || isChannelFetching ? (
				<FoundChannels
					digest={digest}
					channels={channels}
					isLoading={isChannelFetching}
				/>
			) : (
				<NotFound searchText={searchText} />
			)}
		</div>
	)
}
