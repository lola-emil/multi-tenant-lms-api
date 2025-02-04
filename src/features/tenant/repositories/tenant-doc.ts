import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "tenant_docs";
export type TenantDoc = {
    id: number,
    doc_type: string,
    
    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<TenantDoc>(TBL_NAME);