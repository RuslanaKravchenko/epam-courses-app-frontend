import styled from 'styled-components';
const LogoStyled = styled.div`
	margin-right: auto;
	cursor: pointer;

	&:hover {
		.icon {
			fill: #b39ddb;
		}
	}

	.icon {
		fill: #ffffff;
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
`;

export default LogoStyled;
