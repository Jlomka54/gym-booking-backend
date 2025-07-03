const parseNumber = (number) => {
  if (typeof number !== 'string') return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return;

  return number;
};

export const parseTrainersFilterParams = ({ minRating, maxRating }) => {
  const parsedMinRating = parseNumber(minRating);
  const parsedMaxRating = parseNumber(maxRating);

  return {
    minRating: parsedMinRating,
    maxRating: parsedMaxRating,
  };
};
