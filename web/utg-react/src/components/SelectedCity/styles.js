import styled from "styled-components";
import Variables from "../../common/styles/variables";

export const Wrapper = styled.div`
  padding: 2em 2em 3em;
  background: url("https://www.doi.gov/sites/doi.gov/files/uploads/ZionNPTomMorrisSmall.jpg")
    center center no-repeat;
  background-size: cover;

  @media (min-width: ${Variables.gridTab}) {
    padding: 8% 2em 12%;
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
