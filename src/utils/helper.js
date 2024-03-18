export const checkValid = (data) => {
  return !!(
    Array.isArray(data) &&
    data.length === 1 &&
    typeof data[0] === "object" &&
    data[0] !== null &&
    "email" in data[0] &&
    "name" in data[0] &&
    "profilePicLink" in data[0]
  );
};

export const checkBoolValue = (num) => {
  return num === 1;
};
