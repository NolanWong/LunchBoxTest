 //imports and configs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey: "AIzaSyBYvVybs496FHpiQbqNmQyrg0YOpZaRcNc",
    // authDomain: "lunchbox-2815d.firebaseapp.com",
    // projectId: "lunchbox-2815d",
    // storageBucket: "lunchbox-2815d.firebasestorage.app",
    // messagingSenderId: "945076737341",
    // appId: "1:945076737341:web:4466cf8cc243b71d6be154",
    // measurementId: "G-C2CCXQ3JDN"
    apiKey: "AIzaSyDwdFssKc8-QiyrMNwVURNga882xpO4bIY",
    authDomain: "lunchboxweb-7b9c1.firebaseapp.com",
    projectId: "lunchboxweb-7b9c1",
    storageBucket: "lunchboxweb-7b9c1.firebasestorage.app",
    messagingSenderId: "160202746545",
    appId: "1:160202746545:web:087529c4e7432a91329090",
    measurementId: "G-C2E1SK93M1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
//handle form submission
                function submitForm(event) {
    //email to it's Google Sheet
    // 2025- This was made by the last guys. I don't know what it does and The entir program breaks when removed.
    // 2025- This was made by the last guys. I don't know what it does and The entir program breaks when removed.
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyszkeMxNOSgKDwxueAc7aiZcY8ZrvlJlQUnHcWkt63zymvxipmiq-pefW7E3aM1vKa/exec'
    const form = document.forms['submit-to-google-sheet']
    console.log("submit to google sheet btn triggered")
    
    form.addEventListener('submit', e => {
        console.log("Start of EventListener");
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response =>{ console.log('Google Sheet Success!', response)})
        .catch(error => console.error('Error!', error.message));
    })
    
    console.log("form submitting")
    //event.preventDefault();
    const email = document.getElementById('emailINPUT').value;
    const password = document.getElementById('passwordINPUT').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //checkbox initializations
        const closedCHECKBOX1 = document.getElementById('closedCHECKBOX1');
        const closedINPUT1 = closedCHECKBOX1.checked ? "CLOSED" : " ";
        //const closedCHECKBOX2 = document.getElementById('closedCHECKBOX2');
        //const closedINPUT2 = closedCHECKBOX2.checked ? "CLOSED" : " ";
        const closedCHECKBOX3 = document.getElementById('closedCHECKBOX3');
        const closedINPUT3 = closedCHECKBOX3.checked ? "CLOSED" : " ";
        //get values from input fields if closed not checked
        console.log(closedINPUT1)
        //console.log(closedINPUT2)
        console.log(closedINPUT3)
        if (closedINPUT1=="CLOSED"){
            console.log("day 1 closed")
            document.getElementById('entreeINPUT1').value="";
            document.getElementById('soupINPUT1').value="";
            document.getElementById('saladINPUT1').value="";
            document.getElementById('sideINPUT1').value="";
            document.getElementById('dessertINPUT1').value="";
        }
        if (closedINPUT3=="CLOSED"){
            console.log("day 3 closed")
            document.getElementById('entreeINPUT3').value="";
            document.getElementById('soupINPUT3').value="";
            document.getElementById('saladINPUT3').value="";
            document.getElementById('sideINPUT3').value="";
            document.getElementById('dessertINPUT3').value="";
        }
        const dateINPUT1 =      new Date(document.getElementById('dateINPUT1').value).toLocaleDateString('en-US', {timeZone: 'UTC'});;
        const entreeINPUT1 =    document.getElementById('entreeINPUT1').value;
        const soupINPUT1 =      document.getElementById('soupINPUT1').value;
        const saladINPUT1 =     document.getElementById('saladINPUT1').value;
        const sideINPUT1 =      document.getElementById('sideINPUT1').value;
        const dessertINPUT1 =   document.getElementById('dessertINPUT1').value;

        //gets date input 1 and adds two days.
        const tempInput =      new Date(document.getElementById('dateINPUT1').value);
        const dateINPUT3 = tempInput.setDate(tempInput.getDate() + 2).toLocaleString('en-US', {timeZone: 'UTC'});
        
        const entreeINPUT3 =    document.getElementById('entreeINPUT3').value;
        const soupINPUT3 =      document.getElementById('soupINPUT3').value;
        const saladINPUT3 =     document.getElementById('saladINPUT3').value;
        const sideINPUT3 =      document.getElementById('sideINPUT3').value;
        const dessertINPUT3 =   document.getElementById('dessertINPUT3').value;
        console.log(dateINPUT1,dateINPUT3);
        //construct menu data object
        const menuData = {
            tuesday_date: dateINPUT1,
            tuesday_entree: entreeINPUT1,
            tuesday_soup: soupINPUT1,
            tuesday_salad: saladINPUT1,
            tuesday_side: sideINPUT1,
            tuesday_dessert: dessertINPUT1,
            tuesday_closed: closedINPUT1,
            
            thursday_date: dateINPUT3,
            thursday_entree: entreeINPUT3,
            thursday_soup: soupINPUT3,
            thursday_salad: saladINPUT3,
            thursday_side: sideINPUT3,
            thursday_dessert: dessertINPUT3,
            thursday_closed: closedINPUT3
        };
        //generate a timestamp document name
        const timestamp = new Date().toISOString();
        const documentName = `menu_${timestamp}`;
        //push up new data with dynamic document name
        setDoc(doc(db, "menu", documentName), {
        ...menuData,
        timestamp: serverTimestamp(),
        })
        .then(() => {
            console.log("Menu published successfully!");
            alert("Menu published successfully!");
        })
        .catch((error) => {
            console.error("Error publishing menu: ", error);
            alert("Error publishing menu.");
        });
        //emailResults()
    })
    .catch((error) => {
            console.error("Authentication failed: ", error);
            alert("Authentication failed.", error);
        });
    document.getElementById('passwordINPUT').value="";
    
    
}
const submitBTN = document.getElementById("submitBTN");
submitBTN.addEventListener("click", submitForm);