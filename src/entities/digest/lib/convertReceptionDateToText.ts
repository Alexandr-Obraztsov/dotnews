export const convertReceptionDateToText = (
	receptionDateDecoded: boolean[],
	receptionTime: string
) => {
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	const daysText = receptionDateDecoded.reduce(
		(acc, day, index) => (day ? [...acc, days[index]] : acc),
		[] as string[]
	)

	if (daysText.length === 7) return `Every day at ${receptionTime}`

	return `${daysText.join(', ')} at ${receptionTime}`
}
