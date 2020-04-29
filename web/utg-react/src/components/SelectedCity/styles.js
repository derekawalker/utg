import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.div`
  padding: 2em 2em 3em;
  background: url("/themes/custom/utg/images/Zion_National_Park_Small.jpg")
    center center no-repeat;
  background-size: cover;

  @media (min-width: ${Variables.gridTab}) {
    padding: 4% 2em 6%;
    background: url("/themes/custom/utg/images/Zion_National_Park.jpg") center
      center no-repeat;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export const SelectWrapper = styled.div`
  padding: 2px;
  background: linear-gradient(
    to bottom right,
    ${Variables.colorTealLight},
    ${Variables.colorTeal}
  );
  border-radius: ${Variables.rad};
  max-width: 300px;
  margin: 0 0.5em 0 3em;

  .ui.selection.dropdown {
    & > .text {
      font-size: 1.2em;
      font-weight: 300;
      text-align: center;
      width: 100%;
    }
  }
`;

export const SelectLabel = styled.div`
  font-size: 0.9em;
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Spinner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row no-wrap;
  align-items: center;
  justify-content: center;
  background: ${Variables.colorWhite85};
  color: ${Variables.colorTeal};
  z-index: 3;
`;
