'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { fadeInUp, containerVariants, EASE_SMOOTH } from "@/lib/animations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRICING_PLANS } from "@/lib/constants";

const PLAN_SLUGS = ["scout", "navigator", "captain"] as const;

const SOCIAL_PROVIDERS = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
    className: "hover:border-[#4285F4]/60 hover:bg-[#4285F4]/10 hover:shadow-[0_0_20px_rgba(66,133,244,0.15)]",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    className: "hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 hover:shadow-[0_0_20px_rgba(24,119,242,0.15)]",
  },
  {
    id: "apple",
    name: "Apple",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-1.18 1.35-1.8 2.69-2.8 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
    className: "hover:border-[var(--text-primary)]/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  },
  {
    id: "x",
    name: "X",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    className: "hover:border-[var(--text-primary)]/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  },
] as const;

function getPlanFromSlug(slug: string | null) {
  if (!slug) return null;
  const i = PLAN_SLUGS.indexOf(slug as (typeof PLAN_SLUGS)[number]);
  return i >= 0 ? PRICING_PLANS[i] : null;
}

function getOriginAndState() {
  if (typeof window === "undefined") return { origin: "", state: "" };
  return {
    origin: window.location.origin,
    state: window.location.search.slice(1) || "",
  };
}

function getGoogleAuthUrl(): string {
  const { origin, state } = getOriginAndState();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = `${origin}/api/auth/callback/google`;
  if (!clientId || !origin) return "https://accounts.google.com";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

function getFacebookAuthUrl(): string {
  const { origin, state } = getOriginAndState();
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const redirectUri = `${origin}/api/auth/callback/facebook`;
  if (!appId || !origin) return "https://www.facebook.com";
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "email,public_profile",
    state,
  });
  return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
}

function getAppleAuthUrl(): string {
  const { origin, state } = getOriginAndState();
  const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
  const redirectUri = `${origin}/api/auth/callback/apple`;
  if (!clientId || !origin) return "https://appleid.apple.com";
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    response_mode: "query",
    scope: "name email",
    state,
  });
  return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
}

async function getTwitterAuthUrl(): Promise<string> {
  const { origin, state } = getOriginAndState();
  const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
  const redirectUri = `${origin}/api/auth/callback/x`;
  if (!clientId || !origin) return "https://twitter.com";
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  if (typeof document !== "undefined") {
    document.cookie = `twitter_oauth_verifier=${encodeURIComponent(verifier)}; path=/; max-age=600; SameSite=Lax`;
  }
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "tweet.read users.read offline.access",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  }
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function SignupForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const selectedPlan = getPlanFromSlug(planParam);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [planSlug, setPlanSlug] = useState(planParam ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to your auth/signup API later
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative w-full overflow-hidden pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <motion.div
          className="relative z-10 mx-auto max-w-md px-6 text-[var(--text-primary)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-center text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Create your account
          </motion.h1>
          <motion.p
            className="mt-3 mb-6 text-center text-[var(--text-quaternary)]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Join Temto and start trading with confidence.
          </motion.p>

          {/* Continue with social */}
          <motion.div
            className="mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-[var(--text-quaternary)]">
              Continue with
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {SOCIAL_PROVIDERS.map((provider, i) => (
                <motion.button
                  key={provider.id}
                  type="button"
                  className={`
                    flex min-h-[48px] items-center justify-center rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] p-3.5 text-[var(--text-primary)] transition-all duration-300
                    ${provider.className}
                  `}
                  aria-label={`Continue with ${provider.name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: EASE_SMOOTH }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  onClick={async () => {
                    let url: string;
                    switch (provider.id) {
                      case "google":
                        url = getGoogleAuthUrl();
                        break;
                      case "facebook":
                        url = getFacebookAuthUrl();
                        break;
                      case "apple":
                        url = getAppleAuthUrl();
                        break;
                      case "x":
                        url = await getTwitterAuthUrl();
                        break;
                      default:
                        return;
                    }
                    window.location.href = url;
                  }}
                >
                  <span className="flex shrink-0 [&>svg]:size-6">
                    {provider.icon}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--border-secondary)]" />
              <span className="text-xs font-medium text-[var(--text-quaternary)]">or sign up with email</span>
              <span className="h-px flex-1 bg-[var(--border-secondary)]" />
            </div>
          </motion.div>

          {selectedPlan && (
            <motion.div
              className="mb-8 rounded-xl border border-[var(--accent-primary)]/40 bg-[var(--bg-card-hover)] p-4 text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.02,
                borderColor: "rgba(37, 193, 241, 0.6)",
                transition: { duration: 0.25 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <p className="text-xs uppercase tracking-wider text-[var(--accent-primary)]">
                Selected plan
              </p>
              <p className="mt-1 font-semibold text-[var(--text-primary)]">
                {selectedPlan.title} — {selectedPlan.price}
                {selectedPlan.period}
              </p>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Navigator"
                className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-quaternary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                required
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-quaternary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                required
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-quaternary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                required
                minLength={8}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-quaternary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                required
                minLength={8}
              />
            </motion.div>
            {!selectedPlan && (
              <motion.div variants={fadeInUp}>
                <label htmlFor="plan" className="mb-1.5 block text-sm font-medium text-[var(--text-secondary)]">
                  Plan
                </label>
                <select
                  id="plan"
                  value={planSlug}
                  onChange={(e) => setPlanSlug(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                >
                  <option value="">Choose a plan</option>
                  {PRICING_PLANS.map((plan, i) => (
                    <option key={plan.title} value={PLAN_SLUGS[i]}>
                      {plan.title} — {plan.price}
                      {plan.period}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
            <motion.button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] py-3.5 text-sm font-bold text-[var(--text-primary)] transition hover:brightness-110"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            >
              Sign up
            </motion.button>
          </motion.form>

          <motion.p
            className="mt-8 text-center text-sm text-[var(--text-quaternary)]"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Already have an account?{" "}
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/" className="text-[var(--accent-primary)] hover:underline inline-block">
                Sign in
              </Link>
            </motion.span>
          </motion.p>

          <motion.div
            className="mt-8 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <motion.span whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/plans"
                className="inline-block text-sm text-[var(--text-quaternary)] hover:text-[var(--accent-primary)]"
              >
                ← Back to plans
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 flex items-center justify-center">
          <p className="text-[var(--text-quaternary)]">Loading…</p>
        </main>
        <Footer />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
