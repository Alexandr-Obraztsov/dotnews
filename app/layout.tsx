import './globals.css'
import { StoreProvider } from '@/app'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Inter } from 'next/font/google'
import { SkeletonTheme } from 'react-loading-skeleton'

const inter = Inter({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<title>My TMA App</title>
			</head>
			<body className={`${inter.className} antialiased`}>
				<SkeletonTheme
					baseColor='var(--background)'
					highlightColor='var(--foreground)'
				>
					<ThemeProvider>
						<StoreProvider>{children}</StoreProvider>
					</ThemeProvider>
				</SkeletonTheme>
			</body>
		</html>
	)
}
