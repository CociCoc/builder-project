import React from "react";
import { Table } from "antd";
import { ProductPurchase } from "../types";

export interface ProductTableProps {
  products: ProductPurchase[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: ProductPurchase, b: ProductPurchase) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: ProductPurchase, b: ProductPurchase) => a.price - b.price,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
  ];

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h3 style={{ marginBottom: 16 }}>Product List</h3>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        bordered
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};
