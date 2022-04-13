import styled from 'styled-components';

const LoginStyled = styled.section`
	margin: 0 auto;
	max-width: 500px;

	.title {
		font-size: 32px;
		text-align: center;
	}

	.text {
		text-align: center;

		.link {
			margin-left: 10px;
			font-weight: 500;
			color: #6a1b9a;
			cursor: pointer;
			transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

			&:hover {
				color: #b39ddb;
			}
		}
	}
`;

export default LoginStyled;
