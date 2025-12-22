import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title') || 'Portfolio Showcase';
        const description = searchParams.get('description') || 'Engineering Excellence';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)',
                        color: '#fff',
                        fontFamily: 'Inter, sans-serif',
                        padding: '40px 80px',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 20, color: '#444', letterSpacing: 8, textTransform: 'uppercase' }}>
                        Project Showcase
                    </div>
                    <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -2, lineHeight: 1, marginBottom: 20 }}>
                        {title}
                    </div>
                    <div style={{ fontSize: 32, color: '#888', maxWidth: '80%' }}>
                        {description}
                    </div>
                    <div style={{
                        marginTop: 40,
                        padding: '12px 24px',
                        border: '1px solid #333',
                        borderRadius: 100,
                        fontSize: 20,
                        color: '#aaa',
                        backgroundColor: '#111'
                    }}>
                        portfolio.example.com
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: unknown) {
        console.log(e instanceof Error ? e.message : String(e));
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
