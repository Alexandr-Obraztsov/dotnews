export const encodeReceptionDays = (receptionDays: boolean[]) => {
	return receptionDays.map(day => (day ? '1' : '0')).join('')
}
