import { auth } from "@/auth";
import prisma from "@/lib/db";
import { CreditCard, DollarSign, FileText } from "lucide-react";

export default async function BillingPage() {
  // const session = await auth();
  
  // const user = await prisma.user.findUnique({
  //   where: { email: session?.user?.email! },
  //   include: { customer: { include: { billingProfile: true } } }
  // });

  // const isWeekly = user?.customer?.billingProfile?.billingMode === 'weekly_autodebit';
  const isWeekly = false; // Mock data

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Billing</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Payment Methods Section (Zoho Integration) */}
          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative overflow-hidden">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Saved Payment Methods</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Your payment methods are securely vaulted using Zoho Payments. We do not store your full card details on our servers.
            </p>
            
            <a href="https://inventory.zoho.com/portal" target="_blank" className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors shadow">
              Manage Cards & Bank Accounts
            </a>
            
            {isWeekly && (
              <p className="text-xs text-gray-500 mt-4 text-center">
                Your default method here will be used for Weekly Automated Billing.
              </p>
            )}
          </div>

          {/* Add Funds Section */}
          {!isWeekly && (
            <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Add Wallet Funds</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Add funds instantly using your saved payment methods. All funds are applied to your shipping balance immediately.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 border border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 text-gray-700 font-medium py-3 rounded-lg transition-colors">
                  $100
                </button>
                <button className="flex-1 border border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 text-gray-700 font-medium py-3 rounded-lg transition-colors">
                  $500
                </button>
                <button className="flex-1 border border-gray-300 hover:border-indigo-600 hover:bg-indigo-50 text-gray-700 font-medium py-3 rounded-lg transition-colors">
                  Custom
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 text-gray-400 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
        </div>
        
        <p className="text-gray-500 text-sm">
          All finalized billing and wallet top-up invoices are strictly managed in your accounting ledger. 
          <a href="https://inventory.zoho.com/portal" className="text-indigo-600 hover:underline ml-1 font-medium">
            View full invoice history in the Client Portal &rarr;
          </a>
        </p>
      </div>
    </div>
  );
}
