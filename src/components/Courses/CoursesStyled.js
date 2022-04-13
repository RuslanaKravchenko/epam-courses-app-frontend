import styled from 'styled-components';
const CoursesStyled = styled.div`
	color: #182358;

	.searchBar {
		&__wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40px;
		}

		&__addCourse {
			font-weight: 700;
		}
	}

	.coursesList {
		&__item {
			padding: 20px;
			position: relative;
			background: #ffffff;
			border-radius: 5px;

			&::before {
				content: '';
				position: absolute;
				top: -2px;
				bottom: -2px;
				left: -2px;
				right: -2px;
				background: linear-gradient(
					135deg,
					#a17cff4d 20%,
					#7ce8bc4d 50%,
					#7cc5f94d 80%
				);
				background-size: 300% 300%;
				border-radius: 5px;
				z-index: -1;
			}

			&:not(:last-child) {
				margin-bottom: 30px;
			}
		}
	}

	.defaultText {
		margin-top: 100px;
		text-align: center;
	}
`;

export default CoursesStyled;
