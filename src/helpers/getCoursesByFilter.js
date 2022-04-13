export const getCoursesByFilter = (arr, filter) => {
	const newArr = arr.filter(
		course =>
			course.title.toLowerCase().includes(filter.toLowerCase()) ||
			course.id === filter.toLowerCase()
	);
	return newArr;
};
