import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
})

export const config = {
  matcher: [
    "/api/generate/:path*",
    "/api/user/:path*",
  ]
} 