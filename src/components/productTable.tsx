import React from 'react';
import { Table } from 'antd';
import { ProductPurchase } from '../types';

export interface ProductTableProps {
    products: ProductPurchase[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
    ];

    return (
        <div>
            <h3>Product List</h3>
            <Table
                columns={columns}
                dataSource={products}
                rowKey="id"
                pagination={false} // Disable pagination if not needed
                bordered
            />
        </div>
    );
};
