// Product type definition
export interface Product {
    _id: string;
    title: string;
    slug: string;
    category: string;
    categoryName: string;
    basePrice: number;
    images: Array<{
        filePath: string;
    }>;
    user?: {
        name: string;
        email: string;
    };
    isPublished: boolean;
    isSoldout: boolean;
    verifyRequest?: boolean;
    totalBids?: number;
    bidEndDate: string | Date;
}
