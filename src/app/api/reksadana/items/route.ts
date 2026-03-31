import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: categories, error } = await supabase
      .from("rd_categories")
      .select(`
        id,
        name,
        rd_items (
          id,
          name
        )
      `)
      .order('id');

    if (error) {
      console.error("Supabase error fetching items:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("Error fetching reksa dana items:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
