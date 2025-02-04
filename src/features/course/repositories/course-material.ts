import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "course_materials";
export type CourseMaterial = {
    id: number,
    description: string,
    
    uri: string,
    material_type: string,
    mimetype: string,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<CourseMaterial>(TBL_NAME);