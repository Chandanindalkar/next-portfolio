import { NextResponse } from 'next/server';

export async function GET() {
  // Mock Data for "Now Playing"
  const mockData = {
    isPlaying: true,
    title: "Dreaming of the Future",
    artist: "Neon Systems",
    album: "Synthwave Horizons",
    albumImageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&auto=format&fit=crop", 
    songUrl: "https://spotify.com",
  };

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockData);
}
