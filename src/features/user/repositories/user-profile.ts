import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "user_profiles";
export type UserProfile = {
    id: number,
    user_id: number,
    fname: string,
    mname?: string,
    lname: string,

    birthdate?: Date,

    created_at: Date,
    updated_at: Date,
};


export default new CrudRepo<UserProfile>(TBL_NAME);