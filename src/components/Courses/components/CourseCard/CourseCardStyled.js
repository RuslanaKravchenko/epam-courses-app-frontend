import styled from 'styled-components';
const CourseCardStyled = styled.div`
	display: grid;
	grid-template-columns: 66% 30%;
	grid-column-gap: 40px;
	grid-auto-rows: 1fr;

	.mainInfo {
		.title {
			font-size: 24px;
			font-weight: 700;
		}

		.description {
			font-size: 16px;
		}
	}

	.metaInfo {
		padding-top: 16px;
		max-width: 360px;

		.label {
			margin-right: 10px;
			font-weight: 700;
		}

		.authors {
			display: block;
			white-space: nowrap;
			overflow-x: hidden;
			padding-right: 10px;
			text-overflow: ellipsis;
		}

		.btns {
			display: flex;
			margin: 30px auto 0;
		}

		&__infoBtn {
			margin-right: 10px;
		}

		&__deleteBtn,
		&__updateBtn {
			display: flex;
			align-items: center;
			justify-content: center;

			min-width: 30px;
			padding: 0;

			svg {
				fill: currentColor;
			}
		}

		&__updateBtn {
			margin-right: 10px;
		}
	}
`;

export default CourseCardStyled;
