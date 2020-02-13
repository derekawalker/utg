export const lowerUnder = text => {
  return text.replace(" ", "_").toLowerCase();
};

export const upperSpace = text => {
  if (text) {
    return text.replace("_", " ").toUpperCase();
  }
};
