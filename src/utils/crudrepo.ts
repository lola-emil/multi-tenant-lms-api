import { db } from "../config/database";

export default class CrudRepo {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async find(query: Partial<unknown>) {
        const result = await db(this.tableName).select().where(query);
        return result;
    }

    async insert(data: unknown) {
        const result = await db(this.tableName).insert(data);
        return result;
    }

    async update(id: number | string, data: Partial<unknown>) {
        const result = await db(this.tableName).update(data).where("id", id);
        return result;
    }

    async remove(id: number | string) {
        const result = await db(this.tableName).delete().where("id", id);
        return result;
    }
}