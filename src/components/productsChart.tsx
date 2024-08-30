import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProductsChartProps } from "../types";

const ProductsChart: React.FC<ProductsChartProps> = ({ data, sales }) => {
  const productSalesMap = new Map<string, number>();

  sales.forEach((sale) => {
    sale.product_ids.forEach((productId) => {
      const currentSales = productSalesMap.get(productId) || 0;
      productSalesMap.set(productId, currentSales + 1);
    });
  });

  const uniqueProducts = Array.from(productSalesMap.entries())
    .map(([productId, salesCount]) => {
      const product = data.find((p) => p.id === productId);
      return product ? { name: product.name, y: salesCount } : null;
    })
    .filter((product) => product !== null);

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Product Sales Distribution",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Sales",
        type: "pie",
        data: uniqueProducts,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ProductsChart;
