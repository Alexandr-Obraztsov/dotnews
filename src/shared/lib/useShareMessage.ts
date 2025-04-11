import { useWebApp } from '@/app/hooks/useWebApp'

export const useShareMessage = () => {
	const webApp = useWebApp()

	return (link: string, text: string) =>
		webApp?.openTelegramLink(`https://t.me/share/url?url=${link}&text=${text}`)
}
