const {pool} = require ('./config'); // Assume pool is the database connection pool

class Shoes {
    id: number;
    name: string;
    categoryId: number;
    minSize: number;
    maxSize: number;
    status: string;

    constructor(id: number, name: string, categoryId: number, minSize: number, maxSize: number, status: string) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.status = status;
    }

    static async listShoes(): Promise<Shoes[]> {
        try {
            const query = `
            SELECT s.id, s.name, s."categoryId", s."minSize", s."maxSize", s.status, c.name AS category 
            FROM "Shoes" s
            JOIN "Categories" c 
            ON s."categoryId" = c.id
            `;

            const { rows } = await pool.query(query);
            const data = rows.map((el: any) => new Shoes(el.id, el.name, el.categoryId, el.minSize, el.maxSize, el.status));
            return data;

        } catch (error) {
            throw error;
        }
    }

    static async addShoes(name: string, categoryId: number, minSize: number, maxSize: number, status: string): Promise<void> {
        try {
            const query = `
            INSERT INTO "Shoes" (name, "categoryId", "minSize", "maxSize", status)
            VALUES ($1, $2, $3, $4, $5)
            `;

            await pool.query(query, [name, categoryId, minSize, maxSize, status]);
        } catch (error) {
            throw error;
        }
    }

    static async editShoesAvai(id: number): Promise<void> {
        try {
            const query = `
            UPDATE "Shoes"
            SET 
                status = 'Available' 
            WHERE 
                id = $1
            `;

            await pool.query(query, [id]);
        } catch (error) {
            throw error;
        }
    }

    static async editShoesDis(id: number): Promise<void> {
        try {
            const query = `
            UPDATE "Shoes"
            SET 
                status = 'Discontinued'
            WHERE 
                id = $1
            `;

            await pool.query(query, [id]);
        } catch (error) {
            throw error;
        }
    }

    static async deleteShoes(id: number): Promise<void> {
        try {
            const query = `
            DELETE FROM "Shoes"
            WHERE id = $1
            `;

            await pool.query(query, [id]);
        } catch (error) {
            throw error;
        }
    }
}

export default Shoes;
