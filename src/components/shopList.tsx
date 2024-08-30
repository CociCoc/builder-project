import React from "react";
import { Select } from "antd";
import { ShopData } from "../types";

const { Option } = Select;

interface ShopListProps {
  shops: ShopData[];
  onShopSelected: (shopID: string) => void;
}

const ShopList: React.FC<ShopListProps> = ({ shops, onShopSelected }) => {
  const handleChange = (value: string) => {
    onShopSelected(value);
  };

  return (
    <Select defaultValue="all" style={{ width: 200 }} onChange={handleChange}>
      <Option value="all">All Shops</Option>
      {shops.map((shop) => (
        <Option key={shop.shopID} value={shop.shopID}>
          {shop.name}
        </Option>
      ))}
    </Select>
  );
};

export default ShopList;
