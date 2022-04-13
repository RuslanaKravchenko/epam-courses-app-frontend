import styled from 'styled-components';
const CourseInfoStyled = styled.section`
	.back {
		position: relative;
		top: -30px;
		font-size: 16px;
		font-weight: 500;
		color: #6a1b9a;

		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

		&:hover,
		&:focus {
			color: #b39ddb;
		}
	}

	.title {
		margin-bottom: 50px;
		text-align: center;
		font-size: 36px;
		font-size: 700;
	}

	.content {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-column-gap: 50px;
	}

	.label {
		font-size: 16px;
		font-weight: 700;

		&:not(.label--authors) {
			margin-right: 10px;
		}

		&--authors {
			margin-bottom: 10px;
		}
	}

	.duration {
		margin-right: 10px;
	}

	.field {
		margin-bottom: 10px;
	}
`;

export default CourseInfoStyled;
