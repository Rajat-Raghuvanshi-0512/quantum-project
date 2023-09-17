// <------------------------------------------Schema validator function-------------------------------------------->
exports.validateSchema = (inputs, schema) => {
  try {
    const options = { errors: { wrap: { label: '' } } };
    const { error } = schema.validate(inputs, options);
    if (error) throw error;
    else return true;
  } catch (error) {
    throw error;
  }
};
