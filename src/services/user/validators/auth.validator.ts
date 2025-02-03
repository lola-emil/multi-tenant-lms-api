import Joi from "joi";
import userRepo, { User } from "../repositories/user";
import { UserProfile } from "../repositories/user-profile";
import bcrypt from "bcrypt";


const authBodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});


const userSchema = Joi.object({
    fname: Joi.string().required(),
    mname: Joi.string(),
    lname: Joi.string().required(),

    birthdate: Joi.date().required(),

    email: Joi.string().email().required(),

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
        }),

})

export async function validateSignIn(body: User) {
    const result = authBodySchema.validate(body, { abortEarly: false });

    if (result.error)
        return result.error.details;

    const matchedUser = await userRepo.find({ email: body.email });

    if (matchedUser.length == 0)
        return { error: `Can't find user with email '${body.email}'` };

    if (!(await bcrypt.compare(body.password, matchedUser[0].password)))
        return { error: `Incorrect password` };

    return null;
}


export async function validateUser(body: User & UserProfile) {
    const result = userSchema.validate(body, { abortEarly: false });

    if (result.error)
        return result.error.details;

    const matchedUser = await userRepo.find({ email: body.email });

    if (matchedUser.length > 0)
        return { error: "email already taken" };

    return null;
}