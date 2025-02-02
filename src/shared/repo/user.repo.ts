import CrudRepo from "../utils/crudrepo";
import Joi from "joi";

const TBL_NAME = "users";

export const userSchema = Joi.object({
    username: Joi.string().required().max(50),
    password: Joi.string()
    .min(8) 
    .max(50) 
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[@$!%*?&]/, "special character")
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 50 characters.",
      "string.pattern.name": "Password must contain at least one {#name}.",
      "any.required": "Password is required."
    })
});

export type User = {
    id: number,
    username: string,
    
    password: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<User>(TBL_NAME);