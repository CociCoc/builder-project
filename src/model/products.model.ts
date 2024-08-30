import { createEvent, createStore, createEffect, sample } from "effector";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ProductPurchase } from "../types";

// Events
export const fetchProducts = createEvent();
export const resetProducts = createEvent();

// Effects
export const fetchProductsFx = createEffect(async () => {
  const productsSnapshot = await getDocs(collection(db, "products"));
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      price: data.price,
    } as ProductPurchase;
  });
});

// Store
export const $products = createStore<ProductPurchase[]>([])
  .on(fetchProductsFx.doneData, (_, products) => products)
  .reset(resetProducts);

sample({
  clock: fetchProducts,
  target: fetchProductsFx,
});
