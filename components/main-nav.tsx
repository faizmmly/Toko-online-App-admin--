'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();
    const params = useParams();
    
    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Dashboard",
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/banners`,
            label: "Banners",
            active: pathname === `/${params.storeId}/banners`
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeId}/sizes`,
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeId}/colors`,
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        }
    ]
    return (
        <nav className={cn(
                "flex items-center space-x-4 lg:space-x-6 overflow-x-auto [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 md:pb-0",
                className
            )}
            {...props}
            >
                {routes.map((route) => (
                    <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                    "text-sm font-medium transition-all px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0",
                    route.active? 
                    "text-slate-900 bg-slate-100 font-semibold dark:bg-slate-800 dark:text-white" 
                    : "text-muted-foreground hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
                >
                {route.label}
                    </Link>
                ))}
        </nav>
    )
}
export default MainNav;