import { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { PackageOpen, CreditCard, LogOut, LayoutDashboard } from "lucide-react";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  // const session = await auth();
  // if (!session) redirect("/api/auth/signin");
  const session = { user: { name: "Test User", email: "test@example.com" } };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <PackageOpen className="h-6 w-6 text-indigo-600 mr-2" />
          <span className="font-bold text-gray-900 text-lg tracking-tight">Shipping Wallet</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <a href="/portal" className="flex items-center px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="/portal/billing" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <CreditCard className="h-5 w-5 mr-3" />
            Billing & Invoices
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 px-4 text-sm font-medium text-gray-500">
            {session.user?.email}
          </div>
          <form action={async () => { "use server"; await signOut(); }}>
            <button className="flex w-full items-center px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">Welcome back, {session.user?.name || "Partner"}</h1>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
