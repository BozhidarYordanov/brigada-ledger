import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(
  async (auth) => {
    const { redirectToSignIn, userId } = await auth();

    if (!userId) {
      return redirectToSignIn();
    }
  },
  {
    signInUrl: "/login",
    signUpUrl: "/register",
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/days/:path*",
    "/employees/:path*",
    "/expenses/:path*",
    "/income/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
