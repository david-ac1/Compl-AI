import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GitLab from "next-auth/providers/gitlab";

export const config: NextAuthConfig = {
    debug: true,
    trustHost: true,
    providers: [
        GitLab({
            clientId: process.env.GITLAB_CLIENT_ID,
            clientSecret: process.env.GITLAB_CLIENT_SECRET,
            authorization: {
                params: { scope: "read_user read_api" }
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
