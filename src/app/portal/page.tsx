import { auth } from "@/auth";
import prisma from "@/lib/db";
import { ArrowUpRight, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { TopUpButton } from "@/components/ui/TopUpButton";

import DatePickerCombo from "@/components/ui/DatePickerCombo";

export default async function PortalDashboard(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await props.searchParams;
  const from = searchParams?.from;
  const to = searchParams?.to;

  const session = await auth();
  
  // Calculate dynamic date range (Defaults to last 7 days)
  let startDate = new Date();
  if (from) {
    startDate = new Date(from);
  } else {
    startDate.setDate(startDate.getDate() - 7);
  }
  startDate.setHours(0, 0, 0, 0);

  let endDate = new Date();
  if (to) {
    endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate.setHours(23, 59, 59, 999);
  }

  // Fetch their full profile from Prisma
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      customer: {
        include: {
          walletLedger: true,
          billingProfile: true,
          chargeEvents: {
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate
              }
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      }
    }
  });

  const customer = user?.customer;
  if (!customer) return <div>No customer profile found. Please contact support.</div>;

  const isWeekly = customer.billingProfile?.billingMode === 'weekly_autodebit';
  const holdStatus = customer.billingProfile?.fulfillmentHoldStatus;
  const balance = customer.walletLedger?.balance || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Critical Status Banner */}
      {holdStatus && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-medium">Fulfillment Paused</h3>
            <p className="text-red-700 text-sm mt-1">
              Your fulfillment has been paused due to {isWeekly ? "a failed weekly payment or exceeded credit cap" : "insufficient wallet balance"}. 
              Please add funds immediately to resume shipping.
            </p>
          </div>
        </div>
      )}

      {/* Top Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ple-navy/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <h3 className="text-gray-500 text-sm font-medium mb-1">Remaining Prepaid Credit / Balance</h3>
            <div className={`text-4xl font-bold tracking-tight ${balance < 50 ? 'text-red-600' : 'text-ple-navy'}`}>
              ${balance.toFixed(2)}
            </div>
            
            <div className="mt-6 flex gap-3">
              <TopUpButton />
            </div>
          </div>
        </div>

        {/* Current Billing Mode */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Current Billing Plan</h3>
            <div className="text-xl font-semibold text-ple-navy flex items-center mt-2">
              {isWeekly ? (
                <><ShieldCheck className="h-6 w-6 text-ple-navy mr-2" /> Weekly Automated</>
              ) : (
                <><PackageOpen className="h-6 w-6 text-ple-navy mr-2" /> Prepaid Standard</>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">
            {isWeekly 
              ? `You are on the established weekly cycle. Unbilled labels will automatically charge to your saved card every Sunday.`
              : `Your labels deduct in real-time from your wallet. Ensure a positive balance to prevent shipping delays.`}
          </p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8 headings">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-ple-navy">Recent Shipping Charges</h2>
          <DatePickerCombo />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-gray-50 text-xs text-gray-500 bg-gray-50/50">
                  <th className="font-semibold py-3 px-6 text-gray-700 w-32">Date</th>
                  <th className="font-semibold py-3 px-6 text-gray-700">Tracking / Order</th>
                  <th className="font-semibold py-3 px-6 text-gray-700 w-40">Carrier</th>
                  <th className="font-semibold py-3 px-6 text-gray-700 w-48">Service</th>
                  <th className="font-semibold py-3 px-6 text-gray-700 w-32">Cost</th>
                  <th className="font-semibold py-3 px-6 text-gray-700 w-32">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customer.chargeEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">No recent shipping charges...</td>
                </tr>
              ) : (
                customer.chargeEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {event.createdAt.toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">{event.trackingNumber || 'Processing...'}</div>
                      <div className="text-xs text-gray-500">Order: {event.veeqoOrderId}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{event.carrier || 'Standard'}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {event.serviceLevel || '-'}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                      ${event.cost.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.paid 
                          ? 'bg-green-50 text-green-700' 
                          : event.billed
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {event.paid ? 'Paid' : event.billed ? 'Billed' : (isWeekly ? 'Pending Cycle' : 'Deducted')}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// Temporary import fix
import { PackageOpen } from "lucide-react";
