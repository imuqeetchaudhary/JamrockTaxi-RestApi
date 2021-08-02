function mongoSerializer(fields) {
  const { _id, __v, ...rest } = fields;

  return { ...rest, id: _id };
}

module.exports = mongoSerializer;
