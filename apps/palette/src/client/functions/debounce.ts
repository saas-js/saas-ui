export default function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: NodeJS.Timeout;
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
