import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchPlaces } from "../../utils/hooks/useFetchPlaces";

// Styled Components.
import {
  FormWrapper,
  Wrapper,
  SelectWrapper,
  SelectLabel,
  Spinner
} from "./styles";

const defaultStorage = {
  location: "all"
};

const SelectedCity = props => {
  const [storage, setStorage] = useState(defaultStorage);
  const [loading, setLoading] = useState(false);

  // const endpoint = "./data/places.json";
  // console.log("change endpoint!");
  const endpoint = "/api/places";

  const { data } = useFetchPlaces(endpoint);

  let locations = Array.from(new Set(_.map(data, "location")));

  let locationOptions = _.map(locations, location => {
    return {
      key: location,
      value: location,
      text: location
    };
  });

  locationOptions.unshift({
    key: "all",
    value: "all",
    text: "Anywhere"
  });

  let spinner = null;

  if (loading) {
    spinner = (
      <Spinner>
        <FontAwesomeIcon icon="sync-alt" spin />
      </Spinner>
    );
  }

  useEffect(() => {
    // Retrieve the object from storage.
    const retrievedObject = JSON.parse(sessionStorage.getItem("utgPrefs"));

    if (retrievedObject && retrievedObject.location) {
      setStorage({ ...storage, location: retrievedObject.location });
    }
  }, []);

  useEffect(() => {
    // Update storage.
    sessionStorage.setItem("utgPrefs", JSON.stringify(storage));
  }, [storage]);

  const handleLocationChange = (e, { name, value }) => {
    setLoading(true);

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
      location: "all"
    });

    window.location.href = "/places";
  };

  let form = (
    <Form onSubmit={handleReset}>
      <FormWrapper>
        <SelectWrapper>
          <Form.Select
            placeholder="Select a Location"
            onChange={handleLocationChange}
            name="location"
            options={locationOptions}
            value={storage.location}
            search
          >
            {spinner}
          </Form.Select>
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
