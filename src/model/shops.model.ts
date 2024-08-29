import { createEvent, createStore, createEffect, sample } from 'effector';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ShopData } from '../types';

// Events
export const fetchShops = createEvent();
export const resetShops = createEvent();

// Effects
export const fetchShopsFx = createEffect(async () => {
    const shopsSnapshot = await getDocs(collection(db, 'shops'));
    return shopsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            shopID: doc.id,
            name: data.name,
            sales: [], // Sales and products are fetched separately
            products: [],
        } as ShopData;
    });
});

// Store
export const $shops = createStore<ShopData[]>([])
    .on(fetchShopsFx.doneData, (_, shops) => shops)
    .reset(resetShops);


sample({
    clock: fetchShops,
    target: fetchShopsFx,
});
