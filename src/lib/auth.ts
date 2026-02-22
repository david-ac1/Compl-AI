import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

export const config: NextAuthConfig = {
    providers: [
        {
            id: "gitlab",
            name: "GitLab",
            type: "oauth",
            clientId: process.env.GITLAB_CLIENT_ID!,
            clientSecret: process.env.GITLAB_CLIENT_SECRET!,
            authorization: {
                url: "https://gitlab.com/oauth/authorize",
                params: { scope: "read_user read_api" },
            },
            token: "https://gitlab.com/oauth/token",
            userinfo: "https://gitlab.com/api/v4/user",
            profile(profile) {
                return {
                    id: String(profile.id),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    username: profile.username,
                };
            },
        },
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
