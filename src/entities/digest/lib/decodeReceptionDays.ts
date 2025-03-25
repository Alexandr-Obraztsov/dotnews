export const decodeReceptionDays = (receptionDaysEncoded: string) => {
	return receptionDaysEncoded.split('').map(day => day === '1')
}
