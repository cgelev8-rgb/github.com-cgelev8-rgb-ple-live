import { auth } from "@/auth";
import prisma from "@/lib/db";
import { CreditCard, DollarSign, FileText, ExternalLink } from "lucide-react";
import { TopUpButton } from "@/components/ui/TopUpButton";

export default async function BillingPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      customer: {
        include: {
          billingProfile: true,
          walletLedger: true,
          paymentEvents: {
            orderBy: { createdAt: 'desc' },
            take: 10
          }
        }
      }
    }
  });

  const customer = user?.customer;
  if (!customer) return <div>No customer profile found. Please contact support.</div>;

  const isWeekly = customer.billingProfile?.billingMode === 'weekly_autodebit';
  const balance = customer.walletLedger?.balance || 0;
  const pendingInvoice = customer.billingProfile?.pendingTopUpInvoiceId;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-ple-navy mb-6">Manage Billing</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payment Methods Section */}
          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative overflow-hidden">
            <div className="flex items-center mb-4">
              <div className="bg-ple-light p-2 rounded-lg mr-3">
                <CreditCard className="h-6 w-6 text-ple-navy" />
              </div>
              <h3 className="text-lg font-semibold text-ple-navy">Payment Options</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Your payment methods are securely managed through Zoho Payments. We do not store your full card details on our servers. To update your payment method, please contact our support team.
            </p>
            
            <a href="https://inventory.zohosecure.com/portal/plepayments" target="_blank" className="w-full block text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-medium transition-colors shadow">
              Manage Payment Options
            </a>
            
            {isWeekly && (
              <p className="text-xs text-gray-500 mt-4 text-center">
                Your default method here will be used for Weekly Automated Billing.
              </p>
            )}
          </div>

          {/* Add Funds Section */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-yellow-50 p-2 rounded-lg mr-3">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-ple-navy">Add Wallet Funds</h3>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm text-gray-500">Current Balance:</span>
                <span className={`text-2xl font-bold ${balance < 50 ? 'text-red-600' : 'text-ple-navy'}`}>
                  ${balance.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                {pendingInvoice 
                  ? `You have an outstanding invoice (#${pendingInvoice}). Please pay it before requesting another top-up.`
                  : 'Add funds to your shipping wallet. An invoice will be generated and a payment link sent to your email.'}
              </p>
            </div>
            
            <TopUpButton />
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-ple-navy mr-2" />
            <h2 className="text-lg font-semibold text-ple-navy">Payment History</h2>
          </div>
          <a 
            href="https://inventory.zoho.com/portal" 
            target="_blank" 
            className="text-sm text-ple-navy hover:underline flex items-center gap-1"
          >
            View full history in Zoho <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        
        <div className="overflow-x-auto">
          {customer.paymentEvents.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 text-xs text-gray-500 bg-gray-50/50">
                  <th className="font-semibold py-3 px-6 text-gray-700">Date</th>
                  <th className="font-semibold py-3 px-6 text-gray-700">Type</th>
                  <th className="font-semibold py-3 px-6 text-gray-700">Invoice</th>
                  <th className="font-semibold py-3 px-6 text-gray-700 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {customer.paymentEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {event.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        event.paymentType === 'wallet_topup'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {event.paymentType === 'wallet_topup' ? 'Wallet Top-Up' : 'Invoice Payment'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-mono">
                      {event.zohoInvoiceNumber || '—'}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-green-700 text-right">
                      +${event.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-8 py-12 text-center">
              <DollarSign className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No payment history yet.</p>
              <p className="text-gray-400 text-xs mt-1">Payments will appear here once processed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
