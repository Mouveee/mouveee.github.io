import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    const skills = await sql`SELECT * FROM skills`;
    const categories = await sql`SELECT * FROM categories`;

    if (!skills || !categories) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    categories.forEach((category) => {
        category.skills = skills.filter((skill) => skill.category_id === category.id);
    });

    return NextResponse.json( categories , { status: 200 });
}
