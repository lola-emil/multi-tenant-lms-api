import { db } from "../config/database";

export default class CrudRepo<T> {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async find(query: Partial<T>, ...cols: Array<keyof T>) {
        const result = await db(this.tableName).select(...cols).where(query);
        return result;
    }

    async insert(data: Partial<T>) {
        const result = await db(this.tableName).insert(data);
        return result;
    }

    async update(id: number | string, data: Partial<T>) {
        const result = await db(this.tableName).update(data).where("id", id);
        return result;
    }

    async remove(id: number | string) {
        const result = await db(this.tableName).delete().where("id", id);
        return result;
    }
}