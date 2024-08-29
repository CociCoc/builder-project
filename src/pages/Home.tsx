import React, { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { fetchShops, $shops, fetchShopsFx } from '../model/shops.model';
import { fetchSales, $sales, fetchSalesFx } from '../model/sales.model';
import { fetchProducts, $products, fetchProductsFx } from '../model/products.model';
import ShopList from '../components/shopList';
import SalesChart from '../components/salesChart';
import SalesTable from '../components/salesTable';
import { ProductTable } from '../components/productTable';
import ProductsChart from '../components/productsChart';
import { Card, Row, Col, Skeleton } from 'antd';
import '../styles/styles.less';

const Home: React.FC = () => {
    const [shops, sales, products, shopsLoading, salesLoading, productsLoading] = useUnit([
        $shops,
        $sales,
        $products,
        fetchShopsFx.pending,
        fetchSalesFx.pending,
        fetchProductsFx.pending,
    ]);

    useEffect(() => {
        fetchShops();
        fetchSales(null);
        fetchProducts();
    }, []);

    const salesData = shops.map(shop => ({
        shopName: shop.name,
        sales: sales.filter(sale => sale.shopID === shop.shopID),
    }));

    return (
        <div className="home-container">
            <Row gutter={[16, 16]} className="home-row">
                {/* Shop List */}
                <Col span={24}>
                    <Card title="Shop List" bordered={true} className="home-card">
                        {shopsLoading ? (
                            <Skeleton active className="skeleton-loading" />
                        ) : (
                            <ShopList
                                shops={shops}
                                onShopSelected={(shopID) => fetchSales(shopID)}
                            />
                        )}
                    </Card>
                </Col>

                {/* Sales Chart */}
                <Col span={12}>
                    <Card title="Sales Chart" bordered={true} className="home-card">
                        {salesLoading || productsLoading ? (
                            <Skeleton active className="skeleton-loading" />
                        ) : (
                            <SalesChart salesData={salesData} products={products} />
                        )}
                    </Card>
                </Col>

                {/* Products Chart */}
                <Col span={12}>
                    <Card title="Product Sales Distribution" bordered={true} className="home-card">
                        {productsLoading || salesLoading ? (
                            <Skeleton active className="skeleton-loading" />
                        ) : (
                            <ProductsChart data={products} sales={sales} />
                        )}
                    </Card>
                </Col>

                {/* Sales Table */}
                <Col span={12}>
                    <Card title="Sales Table" bordered={true} className="home-card">
                        {salesLoading || productsLoading ? (
                            <Skeleton active className="skeleton-loading" />
                        ) : (
                            <SalesTable data={sales} products={products} />
                        )}
                    </Card>
                </Col>

                {/* Product Table */}
                <Col span={12}>
                    <Card title="Product Table" bordered={true} className="home-card">
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
