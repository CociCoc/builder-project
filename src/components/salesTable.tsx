import React from 'react';
import { Table } from 'antd';
import { SalesTableProps } from '../types';
import moment from 'moment';

const SalesTable: React.FC<SalesTableProps> = ({ data, products }) => {
    const calculateCheckAmount = (productIds: string[]): number => {
        const productMap = new Map(products.map(p => [p.id, p.price]));
        return productIds.reduce((total, id) => total + (productMap.get(id) || 0), 0);
    };

    const columns = [
        {
            title: 'Product IDs',
            dataIndex: 'product_ids',
            render: (ids: string[]) => ids.join(', '),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: (a: any, b: any) => {
                const dateA = moment(a.date).toDate().getTime();
                const dateB = moment(b.date).toDate().getTime();
                return dateA - dateB;
            },
            render: (date: any) => moment(date).format('MMMM Do YYYY, h:mm:ss a'),
        },
        {
            title: 'Check Amount',
            dataIndex: 'product_ids',
            render: (ids: string[]) => {
                const amount = calculateCheckAmount(ids);
                return `$${amount.toFixed(2)}`;
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => 'Sales List'}
            footer={() => `Total Sales: ${data.length}`}
        />
    );
};

export default SalesTable;
