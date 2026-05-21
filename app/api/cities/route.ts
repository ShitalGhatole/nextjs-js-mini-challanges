import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cityName = request.nextUrl.searchParams.get("cityName");

  if (!cityName) {
    return NextResponse.json(
      {error: "City name is required"},
      {status: 400}
    )
  }
  
  try {
    const cities = await fetch(`
      https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}
    `);
    const json = await cities.json();
    return NextResponse.json(json);
  } catch {
    return NextResponse.json(
      {error: "Failed to fetch the city"},
      {status: 500}
    )
  }
}