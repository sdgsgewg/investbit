import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const records = await request.json(); // Expected: Array of { item_id, date, yield_1d, yield_ytd }

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Upsert to allow overwriting if user inputs same date again
    const { data, error } = await supabase
      .from("rd_records")
      .upsert(records, { onConflict: "item_id, date" });

    if (error) {
      console.error("Supabase error inserting records:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error inserting reksa dana records:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("rd_records")
      .select(`
        id,
        item_id,
        date,
        yield_1d,
        yield_ytd,
        rd_items (
          id,
          name,
          category_id,
          rd_categories (
            id,
            name
          )
        )
      `)
      .order('date');

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data: records, error } = await query;

    console.log("Records: ", JSON.stringify(records, null, 2));

    if (error) {
      console.error("Supabase error fetching records:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(records);
  } catch (error: any) {
    console.error("Error fetching reksa dana records:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
