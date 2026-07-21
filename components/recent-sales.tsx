// components/recent-sales.tsx
export function RecentSales() {
  return (
    <div className="space-y-6">
      {/* Item 1 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600 text-sm">
            FM
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Faiz Muhammad</p>
            <p className="text-xs text-muted-foreground mt-1">faiz@example.com</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-600">+Rp 250.000</p>
          <span className="inline-block text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full mt-1">
            Lunas
          </span>
        </div>
      </div>

      {/* Item 2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center font-semibold text-purple-600 text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Ahmad Dani</p>
            <p className="text-xs text-muted-foreground mt-1">ahmad@example.com</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-600">+Rp 120.000</p>
          <span className="inline-block text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full mt-1">
            Lunas
          </span>
        </div>
      </div>
    </div>
  );
}