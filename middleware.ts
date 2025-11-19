import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in-memory)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Configuration
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 phút
  maxRequests: 30, // Tối đa 30 requests/phút
  message: 'Quá nhiều yêu cầu! Vui lòng đợi 1 phút.',
};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

function getRateLimitKey(request: NextRequest): string {
  // Sử dụng IP address hoặc user identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return `ratelimit:${ip}`;
}

export function middleware(request: NextRequest) {
  // Chỉ áp dụng rate limit cho API routes hoặc các routes quan trọng
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  
  if (!isApiRoute) {
    return NextResponse.next();
  }

  const key = getRateLimitKey(request);
  const now = Date.now();
  
  let rateLimit = rateLimitStore.get(key);
  
  if (!rateLimit || now > rateLimit.resetTime) {
    // Tạo window mới
    rateLimit = {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
    rateLimitStore.set(key, rateLimit);
    return NextResponse.next();
  }
  
  rateLimit.count++;
  
  if (rateLimit.count > RATE_LIMIT_CONFIG.maxRequests) {
    // Quá giới hạn
    const resetIn = Math.ceil((rateLimit.resetTime - now) / 1000);
    
    return NextResponse.json(
      {
        error: RATE_LIMIT_CONFIG.message,
        retryAfter: resetIn,
      },
      {
        status: 429,
        headers: {
          'Retry-After': resetIn.toString(),
          'X-RateLimit-Limit': RATE_LIMIT_CONFIG.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetTime.toString(),
        },
      }
    );
  }
  
  // Thêm headers thông tin rate limit
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', RATE_LIMIT_CONFIG.maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', (RATE_LIMIT_CONFIG.maxRequests - rateLimit.count).toString());
  response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
  
  return response;
}

// Cấu hình matcher để áp dụng middleware
export const config = {
  matcher: [
    // Áp dụng cho tất cả API routes
    '/api/:path*',
  ],
};
