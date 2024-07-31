import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(100) //Max length should be 100 characters
    .regex(/^[a-zA-Z]+$/) //Field should accept only alphabetical characters
    .required()
    .messages({
      "string.pattern.base":
        "firstName should contain only alphabetical characters.",
    }),
  lastName: Joi.string()
    .min(2)
    .max(100) //Max length should be 100 characters
    .regex(/^[a-zA-Z]+$/) //Field should accept only alphabetical characters
    .required()
    .messages({
      "string.pattern.base":
        "lastName should contain only alphabetical characters.",
    }),
  email: Joi.string().email().required(), //Only valid e-mail addresses can be used
});
