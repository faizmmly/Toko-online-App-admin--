import db from "@/lib/db"

export  const getTotalRevenue = async (storeId: string): Promise<number> => {
    const paidOrders = await db.order.findMany({
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
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + Number(item.product.price);
        }, 0);
        return total + orderTotal;
    }, 0);

    return totalRevenue;
}