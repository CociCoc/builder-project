import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { fetchShops, $shops, fetchShopsFx } from "../model/shops.model";
import { fetchSales, $sales, fetchSalesFx } from "../model/sales.model";
import {
  fetchProducts,
  $products,
  fetchProductsFx,
} from "../model/products.model";
import ShopList from "../components/shopList";
import SalesChart from "../components/salesChart";
import SalesTable from "../components/salesTable";
import { ProductTable } from "../components/productTable";
import ProductsChart from "../components/productsChart";
import { Card, Row, Col, Skeleton } from "antd";
import "../styles/styles.less";

const Home: React.FC = () => {
  const [shops, sales, products, shopsLoading, salesLoading, productsLoading] =
    useUnit([
      $shops,
      $sales,
      $products,
      fetchShopsFx.pending,
      fetchSalesFx.pending,
      fetchProductsFx.pending,
    ]);

  const [selectedShopID, setSelectedShopID] = useState<string>("all");

  useEffect(() => {
    fetchShops();
    fetchSales(null);
    fetchProducts();
  }, []);

  const salesData = shops.map((shop) => ({
    shopID: shop.shopID,
    shopName: shop.name,
    sales: sales.filter((sale) => sale.shopID === shop.shopID),
  }));

  const handleShopSelected = (shopID: string) => {
    setSelectedShopID(shopID);
    fetchSales(shopID);
  };

  return (
    <div className="home-container">
      <Row gutter={[16, 16]} className="home-row">
        <Col span={24}>
          <Card title="Shop List" bordered={true} className="home-card-list">
            {shopsLoading ? (
              <Skeleton active className="skeleton-loading" />
            ) : (
              <ShopList shops={shops} onShopSelected={handleShopSelected} />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Sales Chart" bordered={true} className="home-card-chart">
            {salesLoading || productsLoading ? (
              <Skeleton active className="skeleton-loading" />
            ) : (
              <SalesChart
                salesData={salesData}
                products={products}
                selectedShopID={selectedShopID}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Card
            title="Product Sales Distribution"
            bordered={true}
            className="home-card-chart"
          >
            {productsLoading || salesLoading ? (
              <Skeleton active className="skeleton-loading" />
            ) : (
              <ProductsChart data={products} sales={sales} />
            )}
          </Card>
        </Col>

        {/* Updated Sales Table */}
        <Col xs={24} sm={24} md={12} lg={12} className="table-column">
          <Card title="Sales Table" bordered={true} className="home-card-table">
            {salesLoading || productsLoading ? (
              <Skeleton active className="skeleton-loading" />
            ) : (
              <SalesTable data={sales} products={products} />
            )}
          </Card>
        </Col>

        {/* Updated Product Table */}
        <Col xs={24} sm={24} md={12} lg={12} className="table-column">
          <Card
            title="Product Table"
            bordered={true}
            className="home-card-table"
          >
            {productsLoading ? (
              <Skeleton active className="skeleton-loading" />
            ) : (
              <ProductTable products={products} />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
