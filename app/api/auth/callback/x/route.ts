import { NextRequest, NextResponse } from "next/server";

/**
 * X (Twitter) OAuth 2.0 callback. Twitter redirects here with ?code=...&state=...
 * PKCE: code_verifier was stored in cookie (twitter_oauth_verifier) before redirect.
 *
 * TODO: read code_verifier from cookie, exchange code for token (POST with
 * TWITTER_CLIENT_ID + TWITTER_CLIENT_SECRET + code_verifier), then create/sign-in user.
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
    const verifier = request.cookies.get("twitter_oauth_verifier")?.value;
    // TODO: exchange code + verifier for token (POST https://api.twitter.com/2/oauth2/token)
    // then clear cookie and create/sign-in user
    if (verifier) {
      const res = NextResponse.redirect(redirectUrl);
      res.cookies.delete("twitter_oauth_verifier");
      return res;
    }
  }

  return NextResponse.redirect(redirectUrl);
}
