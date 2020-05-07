module.exports = filterArrByCriteria = (arr, obj) => {
  // NB: Your object keys should correspond to the keys in object array
  const keys = Object.keys(obj);
  return arr.filter(job =>
    keys.every(key => {
      if (
        obj[key] === 'Anywhere' ||
        obj[key] === 'Any' ||
        obj[key] === 'All Category'
      )
        return true;
      return job[key].includes(obj[key]);
    })
  );
};
