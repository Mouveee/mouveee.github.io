import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

interface Category {
  name: string;
  id: number;
  skills: SkillItem[];
};

interface SkillItem {
  name: string;
  label: string;
  description: string;
  icon: string;
}

// Singleton pattern to prevent connection pool exhaustion during development
const globalForDb = global as unknown as { sql: ReturnType<typeof postgres> };

const sql =
  globalForDb.sql || postgres(process.env.POSTGRES_URL!, { ssl: "require" });

if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export async function GET() {
  try {
    const skills = await sql`SELECT * FROM skills ORDER BY id`;
    const categories = await sql`SELECT * FROM categories ORDER BY id`;

    categories.forEach((category) => {
      category.skills = skills.filter(
        (skill) => skill.category_id === category.id
      );
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(data: NextRequest) {
  try {
    const body = await data.json();

    await Promise.all(
      body.map(async (category: Category) => {
        await sql`UPDATE categories
        SET name = ${category.name}
        WHERE id = ${category.id}`;
      })
    );

    return NextResponse.json("YAY!!!!", { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed: " + error },
      { status: 500 }
    );
  }
}
