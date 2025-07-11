import { NextRequest, NextResponse } from "next/server";
import { auth } from '../../auth';
import postgres from "postgres";

interface Category {
  name: string;
  id: number;
  skills: SkillItem[];
}

interface SkillItem {
  id: number;
  category_id: number;
  key: string;
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

    return NextResponse.json(
      {
        categories: categories,
        skills: skills,
      },
      { status: 200 }
    );
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
    const session = await auth();

    if (!session || session?.user?.email !== "huwig.marco@gmail.com") 
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });

    await Promise.all(
      body.categories.map(async (category: Category) => {
        await sql`
          UPDATE categories
          SET name = ${category.name}
          WHERE id = ${category.id}`;
      })
    );

    await Promise.all(
      body.skills.map(async (skill: SkillItem) => {
        await sql`
              INSERT INTO skills (id, category_id, key, label, description, icon)
              VALUES (${skill.id}, ${skill.category_id}, ${skill.key}, ${skill.label}, ${skill.description}, ${skill.icon})
              ON CONFLICT (id) 
              DO UPDATE SET
                  category_id = EXCLUDED.category_id,
                  label = EXCLUDED.label,
                  description = EXCLUDED.description,
                  icon = EXCLUDED.icon;
            `;
      })
    );
    
    await Promise.all(
      body.skills.map(async (skill: SkillItem) => {
        await sql`
              INSERT INTO skills (id, category_id, key, label, description, icon)
              VALUES (${skill.id}, ${skill.category_id}, ${skill.key}, ${skill.label}, ${skill.description}, ${skill.icon})
              ON CONFLICT (id) 
              DO UPDATE SET
                  category_id = EXCLUDED.category_id,
                  label = EXCLUDED.label,
                  description = EXCLUDED.description,
                  icon = EXCLUDED.icon;
            `;
      })
    );

    return NextResponse.json("YAYAY!!!!", { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed: " + error }, { status: 500 });
  }
}
