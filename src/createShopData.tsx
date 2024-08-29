import React, { useEffect } from 'react';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import path as needed

const shopIDs = ['shopID1', 'shopID2', 'shopID3'];
const productIDs = [
    'productID1', 'productID2', 'productID3', 'productID4', 'productID5',
    'productID6', 'productID7', 'productID8', 'productID9', 'productID10'
];

const getRandomTimestamp = () => {
    const start = new Date(2024, 7, 15).getTime(); // August 15, 2024
    const end = new Date(2024, 7, 30).getTime();   // August 30, 2024
    return new Date(start + Math.random() * (end - start));
};

const getRandomProductIDs = () => {
    const numProducts = Math.floor(Math.random() * 5) + 1; // Random number of products between 1 and 5
    const shuffled = productIDs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numProducts);
};

const createShopData = async () => {
    for (const shopID of shopIDs) {
        const salesCollectionRef = collection(db, 'shops', shopID, 'sales'); // Reference to the sales collection

        const numSales = Math.floor(Math.random() * 11) + 5; // Random number of sales between 5 and 15
        for (let i = 0; i < numSales; i++) {
            const salesID = `salesID${i + 1}`; // Generate sales document ID like salesID1, salesID2, etc.
            const salesDocRef = doc(salesCollectionRef, salesID);

            await setDoc(salesDocRef, {
                date: getRandomTimestamp(),
                product_ids: getRandomProductIDs(),
            });
        }
    }
};

const CreateShopData: React.FC = () => {
    useEffect(() => {
        createShopData()
            .then(() => console.log('Shop data created successfully'))
            .catch((error) => console.error('Error creating shop data:', error));
    }, []);

    return <div>Shop data creation in progress...</div>;
};

export default CreateShopData;
