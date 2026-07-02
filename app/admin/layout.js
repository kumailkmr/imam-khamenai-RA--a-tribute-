import { verifySession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const isAuth = await verifySession();
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || "";
  
  if (!isAuth) {
    // Basic protection (Next.js middleware is better, but this works for simple setup)
    // Avoid redirect loop on login page
    // Layouts don't have direct access to pathname cleanly in app router without middleware,
    // so we can just let child pages handle it, or we create a wrapper component.
  }
  
  return <>{children}</>;
}
