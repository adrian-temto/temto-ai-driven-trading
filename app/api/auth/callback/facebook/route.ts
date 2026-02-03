import { NextRequest, NextResponse } from "next/server";

/**
 * Facebook OAuth callback. Facebook redirects here after the user signs in.
 * Query: ?code=...&state=... or ?error=...
 *
 * TODO: exchange `code` for access token (with FACEBOOK_APP_SECRET) and create/sign-in user.
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
    // TODO: exchange code for token (GET https://graph.facebook.com/v18.0/oauth/access_token)
    // and create/sign-in user, then redirect with session
  }

  return NextResponse.redirect(redirectUrl);
}
