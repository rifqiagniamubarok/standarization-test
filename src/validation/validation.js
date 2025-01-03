import { JoiError } from '../error/joi-error.js';

export const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.error) {
    throw new JoiError(JSON.stringify(result.error.details));
  } else {
    return result.value;
  }
};
