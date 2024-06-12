import { NextResponse } from "next/server";
import { mysqlConnection } from "../../utils/api/mysqlConnection";
import { Tunneller } from "../../types/roll";

export async function GET() {
    const connection = await mysqlConnection();

    try {
        const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y') AS birthDate
        , DATE_FORMAT(t.death_date, '%Y') AS deathDate 
        
        FROM tunneller t ORDER BY t.surname, t.forename ASC`;

        const [results]: Array<any> = await connection.query(query);

        const modifiedResults = results.map((result: any) => ({
          ...result,
          fullName: `${result.forename} ${result.surname}`,
        }));
        
        return NextResponse.json(modifiedResults)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
