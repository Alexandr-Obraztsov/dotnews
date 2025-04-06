import './globals.css'
import { StoreProvider } from '@/app'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ToastProvider } from '@/app/providers/ToastProvider'
import { Inter } from 'next/font/google'
import { SkeletonTheme } from 'react-loading-skeleton'

const roboto = Inter({
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html>
			<head>
				<title>My TMA App</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				></meta>
			</head>
			<body className={`${roboto.className} antialiased`}>
				<SkeletonTheme
					baseColor='var(--background)'
					highlightColor='var(--foreground)'
				>
					<ThemeProvider>
						<StoreProvider>
							<ToastProvider>{children}</ToastProvider>
						</StoreProvider>
					</ThemeProvider>
				</SkeletonTheme>
			</body>
		</html>
	)
}
