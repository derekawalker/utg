import React from "react";
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
  Label
} from "semantic-ui-react";
import _ from "lodash";
import { formatNumber } from "accounting";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lowerUnder } from "../../utils/format/format";

// Styled Components.
import {
  Wrapper,
  ImageWrapper,
  PriceWrapper,
  DetailsWrapper,
  Caps
} from "./styles";

const ListItem = props => {
  const {
    image,
    path,
    title,
    city,
    price,
    price_food,
    star_rating,
    cuisine,
    indoor,
    type
  } = props.place;
  const { setParams, params } = props;

  // Custom field output.
  const indoorText = indoor => {
    if (indoor === "indoor") {
      return (
        <Label basic color="grey">
          <Icon name="cloud" />
          <Caps>indoor</Caps>
        </Label>
      );
    }

    if (indoor === "outdoor") {
      return (
        <Label basic color="grey">
          <Icon name="sun" />
          <Caps>outdoor</Caps>
        </Label>
      );
    }

    if (indoor === "both") {
      return (
        <Label basic color="grey">
          <Icon>
            <FontAwesomeIcon icon={["fas", "cloud-sun"]} />
          </Icon>
          <Caps>indoor & outdoor</Caps>
        </Label>
      );
    }
  };

  // Custom field output.
  const cuisineText = array => {
    let cuisines;
    if (array.length > 0) {
      cuisines = _.map(array, (cuisine, index) => (
        <Label key={index} basic color="orange">
          <Caps>{cuisine}</Caps>
        </Label>
      ));
    }

    return <div>{cuisines}</div>;
  };

  // Custom field output.
  const priceIcons = price => {
    if (Number(price) > 0) {
      const dollars = [];

      for (let i = 0; i < Number(price); i++) {
        dollars[i] = <Icon key={i} fitted name="dollar" color="green" />;
      }

      return <div>{dollars}</div>;
    } else {
      return (
        <Header as="h4" color="green">
          FREE
        </Header>
      );
    }
  };

  // Custom field output.
  const starIcons = star_rating => {
    if (Number(star_rating) > 0) {
      const stars = [];

      for (let i = 0; i < Number(star_rating); i++) {
        stars[i] = <Icon key={i} fitted name="star" color="yellow" />;
      }

      return <div>{stars}</div>;
    }
  };

  const handleParamChange = city => {
    setParams({
      ...params,
      city: city
    });
  };

  return (
    <Wrapper href={path} key={props.index}>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <PriceWrapper>
        {price ? <div>{priceIcons(price)}</div> : null}

        {price_food ? <div>{priceIcons(price_food)}</div> : null}
        {star_rating ? <div>{starIcons(star_rating)}</div> : null}
      </PriceWrapper>
      <DetailsWrapper>
        <h3>{title}</h3>
        <p>
          <Caps>{type}</Caps> in{" "}
          <Caps
            onClick={() => {
              handleParamChange(lowerUnder(city));
            }}
          >
            <u>{city}</u>
          </Caps>
        </p>

        {indoor ? <div>{indoorText(indoor)}</div> : null}

        {cuisine.length ? <div>{cuisineText(cuisine)}</div> : null}
      </DetailsWrapper>
    </Wrapper>
  );
};

export default ListItem;
