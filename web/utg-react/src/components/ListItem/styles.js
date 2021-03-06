import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.a`
  padding: 1em 0;
  border-bottom: 1px dotted ${Variables.colorGray25};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  color: ${Variables.colorGray75};
  font-size: 0.75em;

  &:hover,
  &:active,
  &:focus {
    color: ${Variables.colorBlack};
  }

  &:last-child {
    border-bottom: 0;
  }

  @media (min-width: ${Variables.gridPhab}) {
    font-size: 0.9em;
  }

  @media (min-width: ${Variables.gridTab}) {
    font-size: 1em;
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  @media (min-width: ${Variables.gridPhab}) {
    flex-flow: row nowrap;
  }
`;

export const ImageWrapper = styled.div`
  max-width: 85px;
  min-width: 85px;
  height: 85px;
  margin-right: 1em;
  border: 1px solid ${Variables.colorGray10};

  @media (min-width: ${Variables.gridPhab}) {
    max-width: 80px;
    min-width: 80px;
    height: 80px;
  }

  @media (min-width: ${Variables.gridTab}) {
    max-width: 90px;
    min-width: 90px;
    height: 90px;
  }
`;

export const PriceWrapper = styled.div`
  margin-right: 1em;
  max-width: 100%;
  min-width: 100%;
  text-align: left;
  order: 2;

  @media (min-width: ${Variables.gridPhab}) {
    max-width: 80px;
    min-width: 80px;
    text-align: center;
    order: 1;
  }
`;

export const DetailsWrapper = styled.div`
  order: 1;

  h3 {
    margin: 0;
    font-size: 1.35em;
  }
  p {
    margin: 0 0 0.5em;

    a {
      color: #000;
      text-decoration: underline;
    }
  }

  @media (min-width: ${Variables.gridPhab}) {
    order: 2;
  }
`;

export const Caps = styled.span`
  text-transform: capitalize;
`;

export const LabelWrapper = styled.div`
  margin-bottom: 0.25em;
`;

export const Free = styled.span`
  margin-top: 0.25em;
  display: inline-block;

  @media (min-width: ${Variables.gridPhab}) {
    margin-top: 0;
  }
`;

export const HikeRating = styled.div`
  i.clockwise.rotated.icon {
    transform: rotate(45deg) skew(10deg, 10deg);
  }
`;
