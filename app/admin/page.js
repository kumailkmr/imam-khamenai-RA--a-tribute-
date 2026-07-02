import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function AdminPage() {
  const isAuth = await verifySession();
  
  if (!isAuth) {
    redirect("/admin/login");
  }

  return <DashboardClient />;
}
