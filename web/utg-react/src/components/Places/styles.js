import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.div`
  padding: 1em 0;
  color: ${Variables.colorBlack};

  .ui.styled.accordion .button .content {
    padding: 0;
  }
`;

export const ExtrasWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  > div {
    margin-right: 1rem;
  }
`;
