import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lon = request.nextUrl.searchParams.get("lon");
  const lat = request.nextUrl.searchParams.get("lat");

  if (!lon || !lat) {
    return NextResponse.json(
      {error: "Latitude and longitude are required"},
      {status: 400}
    )
  }

  try {
    const response = await fetch(`
      https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}
    `);
    const weatherData = await response.json();
    return NextResponse.json(weatherData);
  } catch {
    return NextResponse.json(
      {error: "Failed to fetch the for the entered city"}, 
      {status: 500}
    );
  }
}