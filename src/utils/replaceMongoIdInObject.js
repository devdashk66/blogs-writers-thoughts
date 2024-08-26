export const replaceMongoIdInObject = (obj) => {
  if (!obj) return null;

  // Function to replace _id with id
  const replaceId = (item) => {
    if (item && item._id) {
      item.id = item._id.toString();
      delete item._id;
    }
    return item;
  };

  // Create a new object to avoid mutating the original
  const newObj = { ...obj };

  // Replace _id in the main object
  replaceId(newObj);

  if (newObj.author) {
    newObj.author = replaceId({ ...newObj.author });
  }

  if (newObj.blogId) {
    newObj.blogId = newObj.blogId.toString();
  }

  return newObj;
};
