const oracledb = require('oracledb');

async function run() {
    let connection;

    try {
        oracledb.autoCommit = true;
        connection = await oracledb.getConnection({ user: "admin", password: "F$nt43214321", connectionString: "db202203061122_high" });
        const soda = connection.getSodaDatabase();
        const collection = await soda.createCollection("mycollection");
        const indexSpec = {
            "name": "CITY_IDX",
            "fields": [{
                "path": "address.city",
                "datatype": "string",
                "order": "asc"
            }]
        };
        await collection.createIndex(indexSpec);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
run();