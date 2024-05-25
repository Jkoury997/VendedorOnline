import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function authMiddleware(req, ev) {
  try {
    
    const cookies = cookie.parse(req.headers.cookie || '');
    const { accessToken, refreshToken } = cookies;

    if (!accessToken) {
      return NextResponse.redirect('/login');
    }

    try {
      // Verifica el accessToken
      jwt.verify(accessToken, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // El accessToken ha expirado, intentamos renovar con el refreshToken
        if (!refreshToken) {
          return NextResponse.redirect('/login');
        }

        // Solicita nuevos tokens a la API de renovación usando fetch nativo
        const response = await fetch(`${process.env.URL_API_AUTH}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        });

        if (!response.ok) {
          return NextResponse.redirect('/login');
        }

        const data = await response.json();
        const newAccessToken = data.accessToken;

        // Establece los nuevos tokens en las cookies
        const newAccessTokenCookie = cookie.serialize('accessToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 15,
          path: '/',
        });

        ev.headers.set('Set-Cookie', [newAccessTokenCookie]);

        return NextResponse.next();
      } else {
        return NextResponse.redirect('/login');
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect('/login');
  }
}
