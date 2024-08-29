import { createEvent, createStore, createEffect, sample } from 'effector';
import { collection, getDocs, query, where, Query, CollectionReference } from 'firebase/firestore';
import { db } from '../firebase';
import { SalesType } from '../types';

// Events
export const fetchSales = createEvent<string | null>();
export const resetSales = createEvent();

// Effects
export const fetchSalesFx = createEffect(async (shopID: string | null) => {
    let salesQuery: Query | CollectionReference = collection(db, 'sales');
    if (shopID && shopID !== 'all') {
        salesQuery = query(salesQuery, where('shopID', '==', shopID));
    }

    const salesSnapshot = await getDocs(salesQuery);
    return salesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            key: doc.id,
            shopID: data.shopID,
            product_ids: data.product_ids,
            date: data.date.toDate(),
        } as SalesType;
    });
});

// Store
export const $sales = createStore<SalesType[]>([])
    .on(fetchSalesFx.doneData, (_, sales) => sales)
    .reset(resetSales);

sample({
    clock: fetchSales,
    target: fetchSalesFx,
});
