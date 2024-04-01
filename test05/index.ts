let query = `
            SELECT s.*, c.name AS category FROM "Shoes" s
            JOIN "Categories" c 
            ON s."categoryId" = c."id"
            `