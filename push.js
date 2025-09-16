//imports and configs
                import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
                import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
                import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
                const firebaseConfig = {
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
                    // 2025- This was made by the last guys. I don't know what it does and The entire program breaks when removed.
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
                    signInWithPopup(auth, provider)
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
                        /*if (closedINPUT2=="CLOSED"){
                            console.log("day 2 closed")
                            document.getElementById('entreeINPUT2').value="";
                            document.getElementById('soupINPUT2').value="";
                            document.getElementById('saladINPUT2').value="";
                            document.getElementById('sideINPUT2').value="";
                            document.getElementById('dessertINPUT2').value="";
                        }*/
                        if (closedINPUT3=="CLOSED"){
                            console.log("day 3 closed")
                            document.getElementById('entreeINPUT3').value="";
                            document.getElementById('soupINPUT3').value="";
                            document.getElementById('saladINPUT3').value="";
                            document.getElementById('sideINPUT3').value="";
                            document.getElementById('dessertINPUT3').value="";
                        }
                        const dateINPUT1 =      new Date(document.getElementById('dateINPUT1').value).toLocaleDateString('en-US', {timeZone: 'UTC'});
                        const entreeINPUT1 =    document.getElementById('entreeINPUT1').value;
                        const soupINPUT1 =      document.getElementById('soupINPUT1').value;
                        const saladINPUT1 =     document.getElementById('saladINPUT1').value;
                        const sideINPUT1 =      document.getElementById('sideINPUT1').value;
                        const dessertINPUT1 =   document.getElementById('dessertINPUT1').value;

                        /*const dateINPUT2 =      document.getElementById('dateINPUT2').value;
                        const entreeINPUT2 =    document.getElementById('entreeINPUT2').value;
                        const soupINPUT2 =      document.getElementById('soupINPUT2').value;
                        const saladINPUT2 =     document.getElementById('saladINPUT2').value;
                        const sideINPUT2 =      document.getElementById('sideINPUT2').value;
                        const dessertINPUT2 =   document.getElementById('dessertINPUT2').value;*/
                        
                        const dateINPUT3 =      new Date(document.getElementById('dateINPUT3').value).toLocaleDateString('en-US', {timeZone: 'UTC'});
                        const entreeINPUT3 =    document.getElementById('entreeINPUT3').value;
                        const soupINPUT3 =      document.getElementById('soupINPUT3').value;
                        const saladINPUT3 =     document.getElementById('saladINPUT3').value;
                        const sideINPUT3 =      document.getElementById('sideINPUT3').value;
                        const dessertINPUT3 =   document.getElementById('dessertINPUT3').value;
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
                            /*wednesday_date: dateINPUT2,
                            wednesday_entree: entreeINPUT2,
                            wednesday_soup: soupINPUT2,
                            wednesday_salad: saladINPUT2,
                            wednesday_side: sideINPUT2,
                            wednesday_dessert: dessertINPUT2,
                            wednesday_closed: closedINPUT2,*/
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
                function showPass(){
                    if(document.getElementById("passwordINPUT").type == "password"){
                        document.getElementById("passwordINPUT").type == "text"
                    }
                }
                const showPassBTN = document.getElementById("showPassBTN")
                const submitBTN = document.getElementById("submitBTN");
                showPassBTN.addEventListener("click", showPass)
                submitBTN.addEventListener("click", submitForm);