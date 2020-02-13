import _ from "lodash";

import { lowerUnder } from "../format/format";

export const findPropertyValues = (data, property) => {
  // Make array of propert values.
  let values = _.map(data, property);

  // Flatten any nested arrays.
  values = [].concat.apply([], values);

  // Remove duplicates.
  values = Array.from(new Set(values));

  // Remove stuff we don't want in there.
  let valuesToRemove = [false, "false", "False", ""];
  values = values.filter(value => valuesToRemove.indexOf(value) === -1);

  let valuesObject;

  // Format the array as an object.
  valuesObject = _.map(values, value => {
    switch (value) {
      case "0":
        return {
          key: value,
          text: "Free",
          value: value
        };
      case "1":
        return {
          key: value,
          text: "$",
          value: value
        };
      case "2":
        return {
          key: value,
          text: "$$",
          value: value
        };
      case "3":
        return {
          key: value,
          text: "$$$",
          value: value
        };
      case "4":
        return {
          key: value,
          text: "$$$$",
          value: value
        };
      case "5":
        return {
          key: value,
          text: "$$$$$",
          value: value
        };
      default:
        return {
          key: value,
          text: _.startCase(value),
          value: value
        };
    }
  });

  if (property === "star_rating") {
    // Format the array as an object.
    valuesObject = _.map(values, value => {
      switch (value) {
        case "0":
          return {
            key: value,
            text: "Free",
            value: value
          };
        case "1":
          return {
            key: value,
            text: "1 Star",
            value: value
          };
        case "2":
          return {
            key: value,
            text: "2 Stars",
            value: value
          };
        case "3":
          return {
            key: value,
            text: "3 Stars",
            value: value
          };
        case "4":
          return {
            key: value,
            text: "4 Stars",
            value: value
          };
        case "5":
          return {
            key: value,
            text: "5 Stars",
            value: value
          };
        default:
          return {
            key: value,
            text: value,
            value: value
          };
      }
    });
  }

  if (property === "location") {
    // Format the array as an object.
    valuesObject = _.map(values, value => {
      return {
        key: value,
        text: value,
        value: value
      };
    });
  }

  // Sort the object.
  let sortedValuesObject = valuesObject.sort((a, b) =>
    a.text.localeCompare(b.text)
  );

  // Add "all" as first item in types array.
  if (property === "type" || property === "location") {
    sortedValuesObject.unshift({
      key: "all",
      text: "All",
      value: "all"
    });
  }

  return sortedValuesObject;
};

export const arrayContainsAnyElementOfArray = (filter, properties) => {
  if (!Array.isArray(properties)) {
    properties = [properties.toString()];
  }
  if (properties) {
    for (var i = 0; i < filter.length; i++) {
      if (filter.some(i => properties.toString().indexOf(i) >= 0)) {
        return true;
      }
    }
    return false;
  }
};

export const filterByString = (collection, searchTerm, keys) => {
  return collection.filter(item => {
    return keys.some(key => {
      if (item[key]) {
        return (
          item[key].toLowerCase().includes(searchTerm.toLowerCase()) === true
        );
      }
      return false;
    });
  });
};
