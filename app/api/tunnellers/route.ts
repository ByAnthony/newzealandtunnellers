import { NextResponse } from "next/server";
import { mysqlConnection } from "@/app/libs/mysqlConnection";
import { Tunneller } from "@/app/types/rollTypes";

type Accumulator = {
  [key: string]: Tunneller[];
};

type DatabaseTunneller = {
  id: number,
  surname: string,
  forename: string,
  birth_date: string | null,
  death_date: string | null,
}

export async function GET() {
    const connection = await mysqlConnection();

    try {
        const query = `SELECT t.id
        , t.surname
        , t.forename
        , DATE_FORMAT(t.birth_date, '%Y') AS birth_date
        , DATE_FORMAT(t.death_date, '%Y') AS death_date 
        
        FROM tunneller t ORDER BY t.surname, t.forename ASC`;

        const [results]: Array<any> = await connection.query(query);

        const groupedData = results.reduce((acc: Accumulator, tunneller: DatabaseTunneller) => {
          const firstLetter = tunneller.surname.charAt(0).toUpperCase();
          if (!acc[firstLetter]) {
            acc[firstLetter] = [];
          }
          acc[firstLetter].push({
            id: tunneller.id,
            name: {
              surname: tunneller.surname,
              forename: tunneller.forename
            },
            birthDate: tunneller.birth_date,
            deathDate: tunneller.death_date
          });
          return acc;
        }, {} as { [key: string]: Tunneller[] });
        
        return NextResponse.json(groupedData)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
