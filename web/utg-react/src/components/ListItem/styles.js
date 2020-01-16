import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.a`
  padding: 1em 0;
  border-bottom: 1px dotted ${Variables.colorGray25};
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
  color: #000;

  &:hover,
  &:active,
  &:focus {
    color: ${Variables.colorGray50};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const ImageWrapper = styled.div`
  max-width: 100px;
  min-width: 100px;
  height: 100px;
  margin-right: 1em;
  border: 1px solid ${Variables.colorGray10};
`;

export const PriceWrapper = styled.div`
  margin-right: 1em;
  max-width: 80px;
  min-width: 80px;
  text-align: center;
`;

export const DetailsWrapper = styled.div`
  h3 {
    margin: 0;
  }
  p {
    margin: 0 0 0.5em;

    a {
      color: #000;
      text-decoration: underline;
    }
  }
`;

export const Caps = styled.span`
  text-transform: capitalize;
`;
