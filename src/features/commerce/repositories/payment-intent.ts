import CrudRepo from "../../../shared/utils/crudrepo";

const TBL_NAME = "payment"
export type PaymentIntent = {
    id: number,
    
};

export default new CrudRepo<PaymentIntent>(TBL_NAME)