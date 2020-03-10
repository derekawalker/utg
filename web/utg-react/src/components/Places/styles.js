import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.div`
  padding: 1em 0;
  color: ${Variables.colorBlack};

  .ui.styled.accordion .button .content {
    padding: 0;
  }
`;

export const FormSubmit = styled.div`
  .button {
    margin-right: 0.5em;
    border: 1px solid transparent;

    &:first-child {
      margin-right: 0.5em;
    }
  }
`;

export const HeadText = styled.span`
  font-size: 1.35rem;
`;
