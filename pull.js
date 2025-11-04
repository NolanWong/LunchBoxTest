//imports and configs
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
        import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
        document.addEventListener("DOMContentLoaded", function () {
        const firebaseConfig = {
                apiKey: "AIzaSyBYvVybs496FHpiQbqNmQyrg0YOpZaRcNc",
                authDomain: "lunchbox-2815d.firebaseapp.com",
                projectId: "lunchbox-2815d",
                storageBucket: "lunchbox-2815d.appspot.com",
                messagingSenderId: "945076737341",
                appId: "1:945076737341:web:4466cf8cc243b71d6be154",
                measurementId: "G-C2CCXQ3JDN"
                };
            //initialize firebase
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const menuCollectionRef = collection(db, 'menu');
            //create a query to get the most recent menu document
            const queryRef = query(menuCollectionRef, orderBy('timestamp', 'desc'), limit(1));
            //set up the snapshot listener
            onSnapshot(queryRef, updateMenu);
            //function to update the menu
            function updateMenu(snapshot) {
                if (!snapshot.empty) {
                    const mostRecentDocument = snapshot.docs[0];
                    const menuDocument = mostRecentDocument.data();
                    //update the HTML 
                    updateMenuItem('date1', 'tuesday_date');
                    updateMenuItem('entree1', 'tuesday_entree');
                    updateMenuItem('soup1', 'tuesday_soup');
                    updateMenuItem('salad1', 'tuesday_salad');
                    updateMenuItem('side1', 'tuesday_side');
                    updateMenuItem('dessert1', 'tuesday_dessert');
                    updateMenuItem('closed1', 'tuesday_closed');
                    updateMenuItem('date3', 'thursday_date');
                    updateMenuItem('entree3', 'thursday_entree');
                    updateMenuItem('soup3', 'thursday_soup');
                    updateMenuItem('salad3', 'thursday_salad');
                    updateMenuItem('side3', 'thursday_side');
                    updateMenuItem('dessert3', 'thursday_dessert');
                    updateMenuItem('closed3', 'thursday_closed');

                    //update all items
                    function updateMenuItem(elementId, dataKey) {
                        if (menuDocument[dataKey] !== undefined) {
                            document.getElementById(elementId).innerText = menuDocument[dataKey];
                            document.getElementById(elementId).display = 'block';
                        } 
                        else {
                            console.error(`${dataKey} is undefined in menuDocument`);
                        }
                    }
                } 
                else {
                    console.log('No documents found in the "menu" collection.');
                }
            }
        });