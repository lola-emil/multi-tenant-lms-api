import { db } from "../config/database";
import { ErrorResponse } from "../middlewares/errorhandler";


type PossibleQuery<T> = {
    offset?: number,
    limit?: number,
    cols?: string,


} & T;

export default class CrudRepo<T> {

    private tableName: string;


    private parseURLQuery(query: PossibleQuery<Partial<T>>) {
        return query;
    }

    private omitHelperQueries(query: PossibleQuery<Partial<T>>) {
        delete query.limit;
        delete query.offset;
        delete query.cols;

        return query;
    }

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async find(query: PossibleQuery<Partial<T>>) {
        try {
            const sql = db(this.tableName);

            if (query.cols)
                sql.select(query.cols.split(","));

            if (query.limit && query.limit > 0)
                sql.limit(query.limit);

            if (query.offset)
                sql.offset(query.offset);

            // removed the helper queries para ma filter ang columns
            sql.where(this.omitHelperQueries(query));
            return await sql;
        } catch (error) {
            throw new ErrorResponse(400, (<any>error).sqlMessage);
        }
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