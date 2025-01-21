import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "api_keys";
export type ApiKey = {
    id: number,

    key: string,
    type: "admin" | "client",

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<ApiKey>(TBL_NAME);