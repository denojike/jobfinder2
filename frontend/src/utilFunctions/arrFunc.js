//Takes a list and an item name and returns a new unique list of the given item name
const uniqueFromArray = (arr, item) => {
  return [...new Set(arr.map(a => a[item]))];
};

export { uniqueFromArray };
