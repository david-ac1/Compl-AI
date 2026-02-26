import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitLab from "next-auth/providers/gitlab";

// PATCH: next-auth@5 beta crashes with ERR_INVALID_URL on Vercel because it 
// attempts to use process.env.VERCEL_URL which lacks the 'https://' prefix.
// By temporarily removing VERCEL from the environment, NextAuth is forced 
// to use the user-provided AUTH_URL instead.
if (process.env.VERCEL) {
    delete process.env.VERCEL;
}

export const config: NextAuthConfig = {
    debug: true,
    trustHost: true,
    providers: [
        GitLab({
            clientId: process.env.GITLAB_CLIENT_ID,
            clientSecret: process.env.GITLAB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "read_user read_api",
                    // Fix ERR_INVALID_URL on Vercel by explicitly defining the redirect URI
                    redirect_uri: `${process.env.AUTH_URL ?? 'https://compl-ai-nu.vercel.app'}/api/auth/callback/gitlab`
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the user's GitLab access_token in the JWT so we can use it server-side
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Expose the access_token to server components
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
