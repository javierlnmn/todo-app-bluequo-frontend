export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
}

export const formatDateTime = (dateString: string): string => {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};

	return date.toLocaleDateString('en-US', options);
}