import db from "@/lib/db";

export interface RecentSale {
    id: string;
    phone: string;
    address: string;
    totalPrice: number;
    productNames: string;
    createdAt: Date;
}

export const getRecentSales = async (storeId: string): Promise<RecentSale[]> => {
    const recentOrders = await db.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    const sales: RecentSale[] = recentOrders.map((order) => {
        const totalPrice = order.orderItems.reduce((total, item) => {
            return total + Number(item.product.price);
        }, 0);


        const productNames = order.orderItems
         .map((item) => item.product.name)
         .join(", ");

         return {
            id: order.id,
            phone: order.phone || "Tidak ada no. telp",
            address: order.address || "Tidak ada alamat",
            totalPrice,
            productNames: productNames || "Product",
            createdAt: order.createdAt,
         };
    });

    return sales;
};