import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import _ from "lodash";
import { cities } from "../../utils/data/cities";
import { lowerUnder } from "../../utils/format/format";

// Styled Components.
import { FormWrapper, Wrapper, SelectWrapper, SelectLabel } from "./styles";

const defaultStorage = {
  city: "all"
};

let cityOptions = _.map(cities, city => {
  return {
    key: lowerUnder(city),
    value: lowerUnder(city),
    text: city
  };
});

cityOptions.unshift({ key: "all", value: "all", text: "All of Utah" });

const SelectedCity = props => {
  const [storage, setStorage] = useState(defaultStorage);

  useEffect(() => {
    // Retrieve the object from storage.
    const retrievedObject = JSON.parse(localStorage.getItem("utgPrefs"));

    if (retrievedObject && retrievedObject.city) {
      setStorage({ ...storage, city: retrievedObject.city });
    }
  }, []);

  useEffect(() => {
    // Update storage.
    localStorage.setItem("utgPrefs", JSON.stringify(storage));
  }, [storage]);

  const handleCityChange = (e, { name, value }) => {
    // Update State.
    setStorage({
      ...storage,
      [name]: value
    });

    window.location.href = "/places";
  };

  const handleReset = () => {
    // Update State.
    setStorage({
      ...storage,
      city: "all"
    });

    window.location.href = "/places";
  };

  let form = (
    <Form onSubmit={handleReset}>
      <FormWrapper>
        <SelectWrapper>
          <Form.Select
            placeholder="Select a City"
            onChange={handleCityChange}
            name="city"
            options={cityOptions}
            value={storage.city}
            search
          />
        </SelectWrapper>
        <Form.Button circular icon="times" />
      </FormWrapper>
    </Form>
  );

  return (
    <Wrapper>
      <SelectLabel>Where to?</SelectLabel>
      {form}
    </Wrapper>
  );
};

export default SelectedCity;
