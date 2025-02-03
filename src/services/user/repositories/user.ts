import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "users";
export type User = {
    id: number,
    email: string,
    password: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<User>(TBL_NAME);