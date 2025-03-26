import { Input } from '@/shared/ui/input/Input'
import Search from 'public/icons/search.svg'
import { useState } from 'react'
import { NotFound } from './not-found/NotFound'
import { DigestHeader } from '@/shared/ui'
import { useParams } from 'next/navigation'
import { useGetDigestByIdQuery } from '@/entities/digest/api/digestsApi'
import { useSearchChannelQuery } from '@/entities/channel/api/channelsApi'
import { FoundChannels } from './found-channels/FoundChannels'

export const SearchChannelsPage = () => {
	const params = useParams()
	const id = params.id as string

	const { data: digest, isLoading } = useGetDigestByIdQuery({ id })

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
			<DigestHeader digest={digest} isLoading={isLoading} />
			<Input
				sx={'mt-4'}
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
