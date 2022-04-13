import styled from 'styled-components';

const CourseFormStyled = styled.section`
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
	.createCourse__btn {
		background-color: #7e57c2;
		color: white;

		&:hover,
		&:active,
		&:focus {
			background-color: #673ab7;
			border-color: #b39ddb;
			color: white;
		}
	}
	.label {
		display: block;
		margin-bottom: 5px;
		color: #464646;
	}

	.subtitle {
		font-size: 16px;
		font-weight: 700;
	}
	.top__wrapper {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 20px;

		.titleFild {
			width: 40%;
		}
	}

	.descriptionFild {
		margin-bottom: 40px;
	}

	.metaInfo {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 50px;
	}

	.addAuthorFild {
		margin-bottom: 20px;
	}

	.createAuthor__btn {
		margin-bottom: 80px;
	}
	.durationFild {
		&__output {
			margin-top: 20px;
			font-size: 20px;

			span {
				margin-left: 10px;
				margin-right: 5px;
				font-size: 26px;
				font-weight: 500;
			}
		}
	}
	.authorsFild,
	.courseAuthorsFild {
		.authorsList__item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}

		.name {
			margin-right: 80px;
			margin-bottom: 0;
		}
	}

	.authorsFild {
		margin-bottom: 120px;
	}

	.error {
		position: absolute;
		font-size: 12px;
		color: red;
	}
`;

export default CourseFormStyled;
