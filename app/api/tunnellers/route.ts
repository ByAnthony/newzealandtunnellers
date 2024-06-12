import { NextResponse } from "next/server";
import { mysqlConnection } from "../../utils/api/mysqlConnection";
import { rollQuery } from "../../utils/api/queries/rollQuery";

export async function GET() {
    const connection = await mysqlConnection();

    try {
        const [results]: Array<any> = await rollQuery(connection);

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
