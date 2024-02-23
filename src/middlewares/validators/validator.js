const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    throw new Error("Required data not complete");
  }
  req.body = value;
  next();
};

module.exports = validate;
