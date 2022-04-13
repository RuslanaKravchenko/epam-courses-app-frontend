export const dateGenerator = creationDate => {
	if (creationDate) {
		const d = creationDate.split('/');

		const formattedCreationDate = new Date(d[2] + '/' + d[1] + '/' + d[0]);
		return formattedCreationDate.toLocaleDateString();
	}

	return new Date().toLocaleDateString('el-GR');
};
