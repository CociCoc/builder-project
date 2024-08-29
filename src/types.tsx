export interface SalesType {
    key: string;
    shopID: string;
    product_ids: string[];
    date: Date;
}

export interface ProductPurchase {
    id: string;
    name: string;
    price: number;
    count?: number;
}

export interface ShopData {
    shopID: string;
    name: string;
    sales: SalesType[];
    products: ProductPurchase[];
}

export interface ShopSelectorProps {
    onDataFetched: (data: ShopData[], shopID: string) => void;
}

export interface SalesChartProps {
    salesData: {
        shopName: string;
        sales: SalesType[];
    }[];
    products: ProductPurchase[];
}

export interface ProductsChartProps {
    data: ProductPurchase[];
    sales: SalesType[];
}

export interface SalesTableProps {
    data: SalesType[];
    products: ProductPurchase[];
}

export interface ProductTableProps {
    products: ProductPurchase[];
}