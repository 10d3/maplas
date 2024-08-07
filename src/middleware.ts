import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
import { getToken } from "@auth/core/jwt";
import NextAuth from "next-auth";
import { auth } from "@/auth/auth";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  console.log(url.host)

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(`.localhost:3000`, `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // const session = await getToken({
    //   req,
    //   secret: `${process.env.NEXTAUTH_SECRET}`,
    //   salt: "authjs.session-token",
    // });
    // if (!session && path !== "/login") {
    //   console.log(null);
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (session && path === "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    return NextResponse.rewrite(
      new URL(`/${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrites for organizer subdomain
  if (hostname === `organizer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/organizer${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrites for influencer subdomain
  if (hostname === `influencer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/influencer${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrites for dashboard subdomain
  if (hostname === `dashboard.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/admin/dashboard${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrites for blog subdomain
  if (hostname === `blog.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/blog${path === "/" ? "" : path}`, req.url)
    );
  }

  // handle event path
  // if (path.startsWith('/event')) {
  //   return NextResponse.rewrite(new URL(`/event${path === "/" ? "" : path}`, req.url));
  // }

  // special case for `vercel.pub` domain
  // if (hostname === "vercel.pub") {
  //   return NextResponse.redirect(
  //     "https://vercel.com/blog/platforms-starter-kit",
  //   );
  // }

  // rewrite root application to the root page
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}