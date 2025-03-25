import './globals.css'
import { StoreProvider } from '@/app'
import { Inter } from 'next/font/google'

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
		<html lang='en'>
			<head>
				<title>My TMA App</title>
			</head>
			<body className={`${inter.className} antialiased`}>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	)
}
