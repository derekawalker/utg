import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Item,
  Loader,
  Segment,
  Accordion,
  Icon,
  Divider,
  Header,
  Placeholder,
} from "semantic-ui-react";
import _ from "lodash";
import { formatNumber } from "accounting";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

// Custom Components.
import {
  findPropertyValues,
  arrayContainsAnyElementOfArray,
  filterByString,
} from "../../utils/filters/filters";
import Paginator from "../../common/components/Paginator";
import ListItem from "../ListItem";

// Styled Components.
import { Wrapper, FormSubmit, HeadText } from "./styles";

library.add(faCloudSun);

const defaultFilters = {
  type: "all",
  location: "all",
  indoor: [],
  price: [],
  food_types: [],
  lodging_types: [],
  star_ratings: [],
  hike_type: [],
  difficulty: [],
};

let placeTypes = [];
let attractionTypes = [];
let indoorTypes = [];
let placePrices = [];
let foodTypes = [];
let lodgingTypes = [];
let starRatings = [];
let locations = [];
let hikeTypes = [];
let hikeDifficulties = [];
let placeName = "Utah";
let placeTypePhrase = "Things to do";

const scrollToRef = (ref) =>
  window.scrollTo({ left: 0, top: ref.current.offsetTop, behavior: "smooth" });

const Places = (props) => {
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [paginationSettings, setPaginationSettings] = useState({
    activePage: 1,
    perPage: 24,
  });
  const [accordion, setAccordion] = useState({
    activeIndex: -1,
  });

  const { data, loading, error, type } = props;

  const pageHeader = useRef(null);

  let filteredData = data;
  let paginatedData = data;
  let filterSet = null;

  if (type) {
    if (type === "restaurant") {
      placeTypePhrase = "Places to eat";
    }
    if (type === "hike") {
      placeTypePhrase = "Places to hike";
    }
    if (type === "lodging") {
      placeTypePhrase = "Places to stay";
    }
  }

  if (filters.location && filters.location !== "all") {
    placeName = filters.location;
  }

  if (data.length) {
    // Get "types".
    placeTypes = findPropertyValues(data, "type");

    // Get "types".
    attractionTypes = findPropertyValues(data, "type");

    // Get location values.
    locations = findPropertyValues(data, "location");

    // Get indoor "types".
    indoorTypes = findPropertyValues(data, "indoor");

    // Get price values.
    placePrices = findPropertyValues(data, "price");

    // Get hike_type values.
    hikeTypes = findPropertyValues(data, "hike_type");

    // Get hike_type values.
    hikeDifficulties = findPropertyValues(data, "difficulty");

    // Get cuisine type values.
    foodTypes = findPropertyValues(data, "cuisine");

    // Get lodging type values.
    lodgingTypes = findPropertyValues(data, "lodging_type");
    // Set to null if no values exist.
    if (lodgingTypes && lodgingTypes[0] && lodgingTypes[0].key === undefined) {
      lodgingTypes = null;
    }

    // Get star rating values.
    starRatings = findPropertyValues(data, "star_rating");
  }

  const handleAccordion = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = accordion.activeIndex === index ? -1 : index;

    setAccordion({ activeIndex: newIndex });
  };

  const handleFilterChange = (e, { name, value }) => {
    if (name === "type") {
      setFilters({
        type: value,
        location: "all",
        indoor: [],
        price: [],
        food_types: [],
        lodging_types: [],
        star_ratings: [],
        hike_type: [],
        difficulty: [],
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }

    setPaginationSettings({ ...paginationSettings, activePage: 1 });
  };

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handlePageChange = (e, pagerInfo) => {
    setPaginationSettings({
      ...paginationSettings,
      activePage: pagerInfo.activePage,
    });
    scrollToRef(pageHeader);
  };

  useEffect(() => {
    // Retrieve the location object from storage.
    const retrievedObject = JSON.parse(sessionStorage.getItem("utgPrefs"));

    if (retrievedObject && retrievedObject.location) {
      // If location storage, update it.
      if (retrievedObject.location !== filters.location) {
        setFilters({
          ...filters,
          location: retrievedObject.location,
        });
      }
    }
  }, []);

  useEffect(() => {
    setPlaces(paginatedData);
  }, [filteredData, paginationSettings, data, filters, searchPhrase]);

  useEffect(() => {
    // Update storage.
    sessionStorage.setItem("utgPrefs", JSON.stringify(filters));
  }, [filters]);

  if (loading)
    return (
      <Wrapper>
        <Segment>
          <Loader active inline="centered">
            Loading...
          </Loader>
        </Segment>
        <Placeholder fluid>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>
      </Wrapper>
    );
  if (error) return <div>error</div>;

  if (filters.type === "attraction" || type === "attraction") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Indoor/Outdoor"
            placeholder="Indoor/Outdoor"
            onChange={handleFilterChange}
            name="indoor"
            options={indoorTypes}
            value={filters.indoor}
            multiple
          />
          <Form.Select
            label="Price"
            placeholder="Price"
            onChange={handleFilterChange}
            name="price"
            options={placePrices}
            value={filters.price}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  if (filters.type === "hike" || type === "hike") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Hike Type"
            placeholder="Hike Type"
            onChange={handleFilterChange}
            name="hike_type"
            options={hikeTypes}
            value={filters.hike_type}
            multiple
          />
          <Form.Select
            label="Difficulty"
            placeholder="Difficulty"
            onChange={handleFilterChange}
            name="difficulty"
            options={hikeDifficulties}
            value={filters.difficulty}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  if (filters.type === "restaurant" || type === "restaurant") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          <Form.Select
            label="Price"
            placeholder="Price"
            onChange={handleFilterChange}
            name="price"
            options={placePrices}
            value={filters.price}
            multiple
          />
          <Form.Select
            search
            label="Cuisine"
            placeholder="Cuisine"
            onChange={handleFilterChange}
            name="food_types"
            options={foodTypes}
            value={filters.food_types}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  if (filters.type === "lodging" || type === "lodging") {
    filterSet = (
      <Segment secondary>
        <Form.Group widths="equal">
          {lodgingTypes ? (
            <Form.Select
              search
              label="Lodging Type"
              placeholder="Lodging Type"
              onChange={handleFilterChange}
              name="lodging_types"
              options={lodgingTypes}
              value={filters.lodging_types}
              multiple
            />
          ) : null}

          <Form.Select
            label="Star Rating"
            placeholder="Star Rating"
            onChange={handleFilterChange}
            name="star_ratings"
            options={starRatings}
            value={filters.star_ratings}
            multiple
          />
        </Form.Group>
      </Segment>
    );
  }

  const handleFormSubmit = () => {
    setFilters(defaultFilters);
    setSearchPhrase("");
    setPaginationSettings({ ...paginationSettings, activePage: 1 });
  };

  let form = (
    <Accordion fluid styled>
      <Accordion.Title
        active={accordion.activeIndex === 0}
        index={0}
        onClick={handleAccordion}
      >
        <Icon name="dropdown" />
        Filter Results
      </Accordion.Title>
      <Accordion.Content active={accordion.activeIndex === 0}>
        <Form onSubmit={() => handleFormSubmit()}>
          <Form.Group widths="equal">
            {type === "all" ? (
              <Form.Select
                label="Type"
                placeholder="Type"
                onChange={handleFilterChange}
                name="type"
                options={placeTypes}
                value={filters.type}
              />
            ) : null}
            {type === "attraction" || type === "hike" ? (
              <Form.Select
                label="Type"
                placeholder="Type"
                onChange={handleFilterChange}
                name="type"
                options={attractionTypes}
                value={filters.type}
              />
            ) : null}
            <Form.Select
              search
              label="Location"
              placeholder="Location"
              onChange={handleFilterChange}
              name="location"
              options={locations}
              value={filters.location}
            />
            <Form.Field
              label="Search"
              control="input"
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              name="search"
              value={searchPhrase}
            />
          </Form.Group>
          {filterSet}
          <FormSubmit>
            <Button>
              <Button.Content>Reset</Button.Content>
            </Button>
            <Button
              as="a"
              primary
              active={accordion.activeIndex === 0}
              index={0}
              onClick={handleAccordion}
            >
              <Button.Content>Apply Filters</Button.Content>
            </Button>
          </FormSubmit>
        </Form>
      </Accordion.Content>
    </Accordion>
  );

  // Default display.
  let content = <div>No Results</div>;

  // Data filter funnel starts here: ----------
  if (data.length) {
    if (filters.type !== "all") {
      filteredData = _.filter(data, (place) => {
        if (place.type) {
          return filters.type === place.type.toLowerCase();
        }
      });
    }

    if (filters.location !== "all") {
      filteredData = _.filter(filteredData, (place) => {
        if (place.location) {
          return filters.location === place.location;
        }
      });
    }

    if (filters.indoor.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.indoor) {
          return arrayContainsAnyElementOfArray(filters.indoor, place.indoor);
        }
      });
    }

    if (filters.price.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.price) {
          return arrayContainsAnyElementOfArray(filters.price, place.price);
        }
      });
    }

    if (filters.hike_type.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.hike_type) {
          return arrayContainsAnyElementOfArray(
            filters.hike_type,
            place.hike_type
          );
        }
      });
    }

    if (filters.difficulty.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.difficulty) {
          return arrayContainsAnyElementOfArray(
            filters.difficulty,
            place.difficulty
          );
        }
      });
    }

    if (filters.star_ratings.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.star_ratings) {
          return arrayContainsAnyElementOfArray(
            filters.star_ratings,
            place.star_rating
          );
        }
      });
    }

    if (filters.food_types.length) {
      filteredData = _.filter(filteredData, (place) => {
        console.log(filters.food_types);
        console.log(place);
        if (place.cuisine) {
          return arrayContainsAnyElementOfArray(
            filters.food_types,
            place.cuisine
          );
        }
      });
    }

    if (filters.lodging_types.length) {
      filteredData = _.filter(filteredData, (place) => {
        if (place.lodging_types) {
          return arrayContainsAnyElementOfArray(
            filters.lodging_types,
            place.lodging_type
          );
        }
      });
    }

    // Apply search filter.
    if (searchPhrase !== "") {
      filteredData = filterByString(filteredData, searchPhrase, [
        "title",
        "location",
      ]);
    }

    // Slice the data for pager.
    const indexOfLastPlace =
      paginationSettings.activePage * paginationSettings.perPage;
    const indexOfFirstPlace = indexOfLastPlace - paginationSettings.perPage;

    paginatedData = filteredData.slice(indexOfFirstPlace, indexOfLastPlace);
  }
  // End data filter funnel. ----------

  if (places && places.length) {
    const listItems = places.map((place, index) => (
      <ListItem
        key={index}
        place={place}
        setFilters={setFilters}
        filters={filters}
      />
    ));

    // Update content display if data exists.
    content = (
      <Fragment>
        <Item.Group divided>{listItems}</Item.Group>
        <Paginator
          activePage={paginationSettings.activePage}
          onPageChange={handlePageChange}
          totalPages={Math.ceil(
            filteredData.length / paginationSettings.perPage
          )}
        />
      </Fragment>
    );
  }

  let counter = (
    <Divider horizontal>
      <Header color="teal" as="h4">{`
      Results: ${formatNumber(filteredData.length, { precision: 0 })}
    `}</Header>
    </Divider>
  );

  return (
    <Wrapper>
      <div ref={pageHeader}></div>
      <Header as="h1">
        <HeadText>
          {placeTypePhrase} in {placeName}
        </HeadText>
      </Header>
      {form}
      {counter}
      {content}
    </Wrapper>
  );
};

export default Places;
