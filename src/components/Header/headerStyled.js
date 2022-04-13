import styled from 'styled-components';
const HeaderStyled = styled.header`
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: #6a1b9a;
	color: white;

	.container {
		display: flex;
		align-items: center;
	}

	.userName {
		margin: 0 40px 0 0;
		font-size: 16px;
	}

	.header__btn {
		color: #00e5ff;
		border-color: #00e5ff;
		min-width: 100px;
		border-radius: 8px;

		&:hover {
			color: #84ffff;
			border-color: #84ffff;
		}
	}
`;

export default HeaderStyled;
