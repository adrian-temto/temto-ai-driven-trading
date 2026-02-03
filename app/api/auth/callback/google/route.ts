import { NextRequest, NextResponse } from "next/server";

/**
 * Google OAuth callback. Google redirects here after the user signs in.
 * Query: ?code=...&state=... (state can hold return path, e.g. plan=scout)
 *
 * Next step: exchange `code` for tokens (server-side with GOOGLE_CLIENT_SECRET)
 * and create or sign in the user. For now we redirect back to the app.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  const baseUrl = request.nextUrl.origin;
  const returnPath = state ? `/signup?${state}` : "/signup";
  const redirectUrl = new URL(returnPath, baseUrl);

  if (code) {
    // TODO: exchange code for tokens (use GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET)
    // and create/sign-in user, then redirect with session
  }

  return NextResponse.redirect(redirectUrl);
}
