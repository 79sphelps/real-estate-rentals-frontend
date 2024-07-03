import styled from "styled-components/macro";

export const Main = styled.div`
  ${({ bg, source }) =>
    bg &&
    ` 
      //  min-height: 100vh;
       background-image:url('${`${source}`}');
  `}
  background-size: cover;
  // background-size: 100% 100%;
  background-position: center;
  background-repeat: none;
  background-attachment: fixed;
`;
