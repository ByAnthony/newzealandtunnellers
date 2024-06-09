import { NextResponse } from "next/server";
import { mysqlConnection } from "../../../utils/mysqlConnection";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const connection = await mysqlConnection();

    try {
        const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y') AS birth_date
        , DATE_FORMAT(t.death_date, '%Y') AS death_date 
        
        FROM tunneller t WHERE t.id=${params.id}`;

        const [results]: any = await connection.query(query);
    
        return NextResponse.json(results[0])
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
