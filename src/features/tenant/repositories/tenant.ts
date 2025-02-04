import CrudRepo from "../../../shared/utils/crudrepo";

const TBL_NAME = "tenants";
export type Tenant = {
    id: number,
    name: string,

    school_id: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<Tenant>(TBL_NAME);