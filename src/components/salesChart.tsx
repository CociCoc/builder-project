import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { SalesChartProps } from "../types";

const SalesChart: React.FC<SalesChartProps> = ({
  salesData,
  products,
  selectedShopID,
}) => {
  const productMap = new Map(products.map((p) => [p.id, p.price]));

  const filteredSalesData =
    selectedShopID === "all"
      ? salesData
      : salesData.filter((shop) => shop.shopID === selectedShopID); // shopID is now available

  const aggregatedSales = filteredSalesData.map((shop) => {
    const totalRevenue = shop.sales.reduce((sum, sale) => {
      const saleAmount = sale.product_ids.reduce((total, productId) => {
        return total + (productMap.get(productId) || 0);
      }, 0);
      return sum + saleAmount;
    }, 0);

    return {
      shopName: shop.shopName,
      revenue: totalRevenue,
    };
  });

  const options: Highcharts.Options = {
    chart: {
      type: "column",
    },
    title: {
      text:
        selectedShopID === "all"
          ? "Revenue Comparison of All Shops"
          : `Revenue for ${aggregatedSales[0]?.shopName || "Selected Shop"}`,
    },
    xAxis: {
      categories: aggregatedSales.map((shop) => shop.shopName),
      title: {
        text: "Shops",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Revenue ($)",
      },
    },
    tooltip: {
      valuePrefix: "$",
    },
    series: [
      {
        name: "Revenue",
        type: "column",
        data: aggregatedSales.map((shop) => shop.revenue),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SalesChart;
