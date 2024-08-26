import { replaceMongoIdInObject } from "./replaceMongoIdInObject";

export const replaceMongoIdInArray = (array) => {
  if (!Array.isArray(array)) return null;

  return array.map((item) => replaceMongoIdInObject(item));
};
