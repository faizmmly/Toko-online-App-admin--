import db from "@/lib/db"

export const getSalesCount = async (storeId: string): Promise<number> => {
    const salesCount = await db.order.count({
        where: {
            storeId,
            isPaid: true,
        },
    });

    return salesCount;
}