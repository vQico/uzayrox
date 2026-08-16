import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for Edge Runtime
// Note: In a real distributed production environment (like Vercel), this map is isolated per region/worker.
// But it is highly effective against basic DDoS and automated bots hitting the same edge node.
const rateLimitMap = new Map<string, { count: number; startTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 50; // Max 50 requests per minute per IP

export function middleware(request: NextRequest) {
  // We only want to rate limit API routes and main page loads, 
  // skip static assets like images, css, js
  const path = request.nextUrl.pathname;
  if (path.startsWith('/_next/') || path.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (ip !== 'unknown') {
    const currentTime = Date.now();
    const limitData = rateLimitMap.get(ip);

    if (!limitData) {
      rateLimitMap.set(ip, { count: 1, startTime: currentTime });
    } else {
      if (currentTime - limitData.startTime < RATE_LIMIT_WINDOW_MS) {
        limitData.count++;
        if (limitData.count > MAX_REQUESTS_PER_WINDOW) {
          // Block the request
          return new NextResponse(
            JSON.stringify({ 
              error: 'Too Many Requests', 
              message: 'Sistem güvenliği nedeniyle geçici olarak engellendiniz. Lütfen 1 dakika sonra tekrar deneyin.' 
            }),
            { status: 429, headers: { 'content-type': 'application/json' } }
          );
        }
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, startTime: currentTime });
      }
    }
  }

  // Basic Security Headers to prevent some automated attacks
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: '/:path*',
};
