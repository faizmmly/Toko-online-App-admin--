"use client"

import { RecentSale } from "@/actions/get-recent-sales";
import { formatter } from "@/lib/utils";
import { CreditCard, ShoppingBag } from "lucide-react";

interface RecentSalesProps {
  data: RecentSale[];
}

export const RecentSales: React.FC<RecentSalesProps> = ({data}) => {
  if (!data || data.length === 0){
    return (  
      <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-xl border-slate-200">
        <div className="p-3 bg-slate-100 rounded-full mb-3 text-slate-400">
          <ShoppingBag className="h-6 w-6"/>
        </div>

        <p className="text-sm font-medium text-slate-600">Belum ada transkasi</p>
        <p className="text-xs text-slate-400 mt-1">
          Transkasi lunas yang terbaru akan muncul disini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((sale) => (
        <div key={sale.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 min-w-0">
            <div className="p-2 bg-emerald-50 rounded-xl shrink-0">
              <CreditCard className="h-5 w-5 text-emerald-600"/>
            </div>

            <div className="space-y-1 min-w-0">
              <p className="text-sm font-medium leading-none text-slate-900 truncate">
                {sale.productNames}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {sale.phone} . {sale.address}
              </p>
            </div>
          </div>

          <div className="font-semibold text-sm text-emerald-600 whitespace-nowrap">
            +{formatter.format(sale.totalPrice)}
        </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;