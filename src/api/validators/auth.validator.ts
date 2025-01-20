import { error } from "winston";
import * as UserRepo from "../../repo/user.repo";



export async function validateUser(body: Partial<UserRepo.User>) {
    const errors = UserRepo.userSchema
        .validate(body, { abortEarly: false })
        .error;

    console.log("errors", errors);

    if (errors)
        return errors;

    return null;
}