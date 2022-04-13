import styled from 'styled-components';

const ButtonStyled = styled.div`
	.button {
		color: #6a1b9a;
		border-color: #6a1b9a;
		font-weight: 500;
		min-width: 200px;

		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

		&:hover,
		&:active,
		&:focus {
			color: #7e57c2;
			border-color: #b39ddb;
		}
	}
`;

export default ButtonStyled;
