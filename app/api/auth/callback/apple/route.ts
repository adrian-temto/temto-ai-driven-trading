import { NextRequest, NextResponse } from "next/server";

/**
 * Sign in with Apple callback. Apple redirects here with ?code=...&state=...
 *
 * TODO: exchange `code` for tokens (POST to Apple with APPLE_CLIENT_SECRET / private key)
 * and create/sign-in user, then redirect with session.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error)}`, request.nextUrl.origin)
    );
  }

  const returnPath = state ? `/signup?${state}` : "/signup";
  const redirectUrl = new URL(returnPath, request.nextUrl.origin);

  if (code) {
    // TODO: exchange code for token (Apple's token endpoint) and create/sign-in user
  }

  return NextResponse.redirect(redirectUrl);
}
