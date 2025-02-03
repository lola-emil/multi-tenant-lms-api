import { db } from "../../config/database";
import { ErrorResponse } from "../middlewares/errorhandler";


type QueryModifiers<T> = {
    offset?: number,
    limit?: number,
    cols?: string,

    order?: "desc" | "asc",

    orderby?: keyof T 

} & T;

export default class CrudRepo<T> {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }


    private omitQueryModifiers(query: QueryModifiers<Partial<T>>) {
        const { limit, offset, cols, order, orderby, ...filteredQuery } = query;
        return filteredQuery;
    }

    private async getTableCols(): Promise<string[]> {
        const columns = await db(this.tableName).columnInfo();
        return Object.keys(columns);
    }

    private async sanitizedCols(cols: string): Promise<string[]> {
        const allowedCols = await this.getTableCols();

        return cols.split(",").filter(col => allowedCols.includes(col.trim()));
    }

    async find(query: QueryModifiers<Partial<T>>): Promise<T[]> {
        try {
            const sql = db(this.tableName);

            if (!query.limit || query.limit < 0)
                query.limit = 10;

            if (query.cols) sql.select(await this.sanitizedCols(query.cols));

            // Apply limit and offset
            sql.limit(query.limit);

            if (query.offset)
                sql.offset(query.offset);
            

            // TODO: validation para sa orderby, kay mag error siya kung dili
            // mao ang column name
            if (query.order || query.orderby)
                sql.orderBy(query.orderby ?? "id", query.order ?? "asc");

            // removed the helper queries para ma filter ang columns
            sql.where(this.omitQueryModifiers(query));

            return await sql;
        } catch (error) {
            console.log(error);
            throw new ErrorResponse(400, "Invalid query");
        }
    }

    async insert(data: Partial<T>): Promise<number[]> {
        const result = await db(this.tableName).insert(data);
        return result;
    }

    async update(id: number | string, data: Partial<T>): Promise<number> {
        const result = await db(this.tableName).update(data).where("id", id);
        return result;
    }

    async remove(id: number | string): Promise<number> {
        const result = await db(this.tableName).delete().where("id", id);
        return result;
    }
}