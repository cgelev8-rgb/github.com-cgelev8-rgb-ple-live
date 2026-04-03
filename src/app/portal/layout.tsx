import { ReactNode } from "react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { PackageOpen, CreditCard, LogOut, LayoutDashboard, TrendingDown, Bell, Factory } from "lucide-react";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="py-5 flex flex-col items-center px-6 border-b border-gray-200">
          <img src="/images/ple-logo.gif" alt="Private Label Express" className="h-10 w-auto mb-1" />
          <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Partner Portal</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-4">Core</div>
          <a href="/portal" className="flex items-center px-4 py-3 bg-ple-navy/5 text-ple-navy rounded-lg font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="/portal/billing" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <CreditCard className="h-5 w-5 mr-3" />
            Billing & Invoices
          </a>

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-8 mb-3 px-4">Insights (Coming Soon)</div>
          <div className="flex items-center justify-between px-4 py-3 text-gray-400 rounded-lg font-medium opacity-70 cursor-not-allowed">
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-3" />
              Inventory Runway
            </div>
            <span className="text-[10px] uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Soon</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-gray-400 rounded-lg font-medium opacity-70 cursor-not-allowed">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3" />
              Low Stock Alerts
            </div>
            <span className="text-[10px] uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Soon</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-gray-400 rounded-lg font-medium opacity-70 cursor-not-allowed">
            <div className="flex items-center">
              <Factory className="h-5 w-5 mr-3" />
              Manufacturing Runs
            </div>
            <span className="text-[10px] uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">Soon</span>
          </div>
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
          <h1 className="text-xl font-semibold text-ple-navy">Welcome back, {session.user?.name || "Partner"}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Need help? <a href="mailto:support@privatelabelexpress.com" className="text-ple-navy hover:underline">Contact Support</a></span>
            <div className="h-9 w-9 rounded-full bg-ple-navy/10 flex items-center justify-center text-ple-navy font-bold text-sm">
              {(session.user?.name || "P").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
