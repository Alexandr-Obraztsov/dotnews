declare module '*.svg' {
	import React, { HTMLProps } from 'react'
	const SVG: React.FC<HTMLProps<HTMLDivElement>>
	export default SVG
}

declare module '*.svg?url' {
	const content: any
	export default content
}
