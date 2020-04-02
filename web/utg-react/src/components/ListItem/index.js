import React from "react";
import { Icon, Header, Label } from "semantic-ui-react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styled Components.
import {
  Wrapper,
  ImageWrapper,
  PriceWrapper,
  DetailsWrapper,
  DataWrapper,
  Caps,
  LabelWrapper,
  Free,
  HikeRating
} from "./styles";

const ListItem = props => {
  const {
    image,
    node_url,
    title,
    location,
    price,
    price_food,
    star_rating,
    difficulty,
    cuisine,
    indoor,
    type,
    lodging_type
  } = props.place;

  // Custom field output.
  const indoorText = indoor => {
    if (indoor.length > 1) {
      return (
        <Label basic color="grey">
          <Icon>
            <FontAwesomeIcon icon={["fas", "cloud-sun"]} />
          </Icon>
          <Caps>indoor & outdoor</Caps>
        </Label>
      );
    }

    if (indoor[0] === "indoor") {
      return (
        <Label basic color="grey">
          <Icon name="cloud" />
          <Caps>indoor</Caps>
        </Label>
      );
    }

    if (indoor[0] === "outdoor") {
      return (
        <Label basic color="grey">
          <Icon name="sun" />
          <Caps>outdoor</Caps>
        </Label>
      );
    }
  };

  // Custom field output.
  const cuisineText = array => {
    let cuisines;
    if (array.length > 0) {
      cuisines = _.map(array, (cuisine, index) => (
        <Label key={index} basic color="grey">
          <Caps>{cuisine}</Caps>
        </Label>
      ));
    }

    return <LabelWrapper>{cuisines}</LabelWrapper>;
  };

  // Custom field output.
  const lodgingTypeText = lodging_type => (
    <LabelWrapper>
      <Label basic color="grey">
        <Caps>{lodging_type}</Caps>
      </Label>
    </LabelWrapper>
  );

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
        <Header as="div" color="green">
          <Free>FREE</Free>
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

  // Custom field output.
  const difficultyIcons = difficulty => {
    let color = "green";
    let icon = "circle";
    let rotated = null;

    if (Number(difficulty) === 1) {
      color = "blue";
      icon = "square";
    }

    if (Number(difficulty) === 2) {
      color = "black";
      icon = "square";
      rotated = "clockwise";
    }
    const rating = <Icon fitted rotated={rotated} name={icon} color={color} />;

    return <HikeRating>{rating}</HikeRating>;
  };

  return (
    <Wrapper href={node_url} key={props.index}>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <DataWrapper>
        <PriceWrapper>
          {price ? <div>{priceIcons(price)}</div> : null}
          {difficulty ? <div>{difficultyIcons(difficulty)}</div> : null}
          {price_food ? <div>{priceIcons(price_food)}</div> : null}
          {star_rating ? <div>{starIcons(star_rating)}</div> : null}
        </PriceWrapper>
        <DetailsWrapper>
          <h3>{title}</h3>
          <p>
            <Caps>{type}</Caps> in{" "}
            <Caps>
              <span>{location}</span>
            </Caps>
          </p>

          {indoor ? <LabelWrapper>{indoorText(indoor)}</LabelWrapper> : null}

          {cuisine && cuisine.length ? <div>{cuisineText(cuisine)}</div> : null}

          {lodging_type ? <div>{lodgingTypeText(lodging_type)}</div> : null}
        </DetailsWrapper>
      </DataWrapper>
    </Wrapper>
  );
};

export default ListItem;
