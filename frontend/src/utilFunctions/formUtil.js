// //Validate Form
// const validateForm = (data, fieldsToSkip, cb) => {
//   const errors = {};
//   const keys = Object.keys(data);
//   keys.forEach(key => {
//     const value = key && data[key].toString().match(/\w+/g);
//     if (fieldsToSkip.indexOf(key) === -1 && value === null) {
//       errors[key] = `${key} is required`;
//     }
//   });

//   //If error, pass error obj to a call back function

//   return errors;
// };

//Validate Form
const validateForm = (data, fieldsToSkip, cb) => {
  const errors = {};
  const keys = Object.keys(data);
  keys.forEach(key => {
    const value = data[key];
    if (fieldsToSkip.indexOf(key) === -1 && !value) {
      errors[key] = `${key} is required`;
    }
  });

  //If error, pass error obj to a call back function

  return errors;
};

export { validateForm };
