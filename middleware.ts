import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (pathname === "/admin/login") return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
