# LunchBox
Website for The Lunchbox - SICTC's Culinary Program's Restaurant

## Front-End Overview

### index.html
This is the main landing page, which shows the weekly menu, information about the resturaunt, and pricing information. <br>
<img src="mdimages/indexOverview.png" height="300px" width="600px"> <br>


### contact.html
This is the other page that the public can access, which has a 'connect with us' form that allows the user to input their name, comments/questions they have, how they found out about the resturaunt, and whether or not they want to sign up for the weekly newsletter. When the user clicks 'submit', the default mail app will open with the information they entered preloaded in the body of the email. <br><br>
The second card displays a map of SICTC and where the visitors need to park. A link to Google Maps is also provided. <br>
<img src="mdimages/contactOverview.png" height="300px" width="600px"> <br>

### uploadMenu.html
This is the admin page. Each day (tue, wed, thu) have their own cards that mimic a similar look to the menu seen by the public. The card on the right has a link to the current menu to make it easier for the admin to see what changes need to be made, email and password input areas, and a publish button. *IMPORTANT - Leaving data fields blank will result in the current menu data being erased, NOT unchanged.<br>
<img src="mdimages/uploadOverview.png" height="300px" width="600px"> <br>


# Inside the Code

## index.html

The following code is located at the top of 'index.html' in the head section. <br>

The firebase is imported, configurated, and initialized - This data can be found in the project settings of the firebase console site. <br> 
```
<script type="module">
//imports and configs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", function () {
const firebaseConfig = {
    apiKey: "AIzaSyCH0Zyzj5tukPUZacOM_xJZk3wFLQIvgNw",
    authDomain: "lunchbox-60fb5.firebaseapp.com",
    databaseURL: "https://lunchbox-60fb5-default-rtdb.firebaseio.com",
    projectId: "lunchbox-60fb5",
    storageBucket: "lunchbox-60fb5.appspot.com",
    messagingSenderId: "534903316915",
    appId: "1:534903316915:web:e7b8e503540d234632ebc6",
    measurementId: "G-TD5GSSYSSY"
};
//initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const menuCollectionRef = collection(db, 'menu');
```

<br>

The query is initialized and finds the most recent collection in the database. <br> 
```
//create a query to get the most recent menu document
const queryRef = query(menuCollectionRef, orderBy('timestamp', 'desc'), limit(1));
//set up the snapshot listener
onSnapshot(queryRef, updateMenu);

```

<br>
Wednesday is commented out, as Chef doesn't do Wednesdays in 2025.<br><br>
The function 'updateMenu(snapshot)' is called to update the menu data. The function contains each data field that is being updated. <br>
updateMenuItem('{elementId}','{dataKey - found in the 'construct menu data' section in uploadMenu.html}') <br>
```
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
        updateMenuItem('date2', 'wednesday_date');
        updateMenuItem('entree2', 'wednesday_entree');
        updateMenuItem('soup2', 'wednesday_soup');
        updateMenuItem('salad2', 'wednesday_salad');
        updateMenuItem('side2', 'wednesday_side');
        updateMenuItem('dessert2', 'wednesday_dessert');
        updateMenuItem('closed2', 'wednesday_closed');
        updateMenuItem('date3', 'thursday_date');
        updateMenuItem('entree3', 'thursday_entree');
        updateMenuItem('soup3', 'thursday_soup');
        updateMenuItem('salad3', 'thursday_salad');
        updateMenuItem('side3', 'thursday_side');
        updateMenuItem('dessert3', 'thursday_dessert');
        updateMenuItem('closed3', 'thursday_closed');
```

<br>


This function 'updateMenuItem' checks that the data key is valid and updates the data. The snapshot listener looks for new data to load. <br>
```
function updateMenuItem(elementId, dataKey) {
    if (menuDocument[dataKey] !== undefined) {
        document.getElementById(elementId).innerText = menuDocument[dataKey];
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
</script>
```

<br>

## contact.html

The following code is located near the bottom of contact.html. This page does not have firebase script. <br>

The 'sumbitForm' function is called when the 'submit' button is clicked in the 'CONNECT WITH US' card.<br>

This script opens the default mail application and preloads the data that is entered into the form. <br>
```
<script>
    function submitForm() {
        //get form input values
            var firstName = document.getElementById('firstname').value;
            var lastName = document.getElementById('lastname').value;
            var comments = document.getElementById('comment').value;
            var foundOut = document.getElementById('foundOut').value;
            var mailingList = document.getElementById('mailingList').checked;
            //check if required fields are not empty
            if (firstName.trim() === '' || lastName.trim() === '' || comments.trim() === '') {
                alert('Please fill in all required fields.');
                return;
                }
                //create email content
                var fullName = `${firstName} ${lastName}`;
                var mailingListText = mailingList ? 'Yes' : 'No';
                //construct the email content as a full sentence with new lines
                var emailContent = `My name is ${fullName} and my comment/question is "${comments}".\n`;
                if (foundOut.trim() !== '') {
                    emailContent += `I found out about this restaurant from ${foundOut}.\n`;
                }
                if (mailingList) {
                    emailContent += `I want to be part of the mailing list.\n`;
                } else {
                    emailContent += `I do not want to be part of the mailing list.\n`;
                }
                //open email client with preloaded content
                window.location.href = 'mailto:samuel.wagoner@evsck12.com?subject=Contact Form Submission&body=' + encodeURIComponent(emailContent);
                }
</script>
```

<br>

## uploadMenu.html

The following code is located at the top of 'uploadMenu.html' in the head section. <br>

The firebase imports are made and the firebase is configurated (similar to index.html). The 'auth' import allows for only authorized users to publish menu data. <br>
```
<script type="module">
    //imports and configs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
    import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
    const firebaseConfig = {
        apiKey: "AIzaSyCH0Zyzj5tukPUZacOM_xJZk3wFLQIvgNw",
        authDomain: "lunchbox-60fb5.firebaseapp.com",
        databaseURL: "https://lunchbox-60fb5-default-rtdb.firebaseio.com",
        projectId: "lunchbox-60fb5",
        storageBucket: "lunchbox-60fb5.appspot.com",
        messagingSenderId: "534903316915",
        appId: "1:534903316915:web:e7b8e503540d234632ebc6",
        measurementId: "G-TD5GSSYSSY"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
```

<br>

This code section runs when the 'submit' button is pressed. The authentication is checked here, passing the email and password in the function. If authenticated, the values are taken from the input fields and are assigned to constant variables to be passed on to the firestore. The checkbox initializations check if the checkbox is checked, and if it is, it sends, 'closed', and if it is unchecked, it sends a blank string.<br>
```
//handle form submission
function submitForm(event) {
    event.preventDefault();
    const email = document.getElementById('emailINPUT').value;
    const password = document.getElementById('passwordINPUT').value;
    signInWithEmailAndPassword(auth, email, password)
    then((userCredential) => {
        //get values from input fields
        const dateINPUT1 = document.getElementById('dateINPUT1').value;
        const entreeINPUT1 = document.getElementById('entreeINPUT1').value;
        const soupINPUT1 = document.getElementById('soupINPUT1').value;
        const saladINPUT1 = document.getElementById('saladINPUT1').value;
        const sideINPUT1 = document.getElementById('sideINPUT1').value;
        const dessertINPUT1 = document.getElementById('dessertINPUT1').value;
                
        const dateINPUT2 = document.getElementById('dateINPUT2').value;
        const entreeINPUT2 = document.getElementById('entreeINPUT2').value;
        const soupINPUT2 = document.getElementById('soupINPUT2').value;
        const saladINPUT2 = document.getElementById('saladINPUT2').value;
        const sideINPUT2 = document.getElementById('sideINPUT2').value;
        const dessertINPUT2 = document.getElementById('dessertINPUT2').value;
                
        const dateINPUT3 = document.getElementById('dateINPUT3').value;
        const entreeINPUT3 = document.getElementById('entreeINPUT3').value;
        const soupINPUT3 = document.getElementById('soupINPUT3').value;
        const saladINPUT3 = document.getElementById('saladINPUT3').value;
        const sideINPUT3 = document.getElementById('sideINPUT3').value;
        const dessertINPUT3 = document.getElementById('dessertINPUT3').value;
        //checkbox initializations
        const closedCHECKBOX1 = document.getElementById('closedCHECKBOX1');
        const closedINPUT1 = closedCHECKBOX1.checked ? "closed" : " ";
        const closedCHECKBOX2 = document.getElementById('closedCHECKBOX2');
        const closedINPUT2 = closedCHECKBOX2.checked ? "closed" : " ";
        const closedCHECKBOX3 = document.getElementById('closedCHECKBOX3');
        const closedINPUT3 = closedCHECKBOX3.checked ? "closed" : " ";
```

<br>

This code assigns the constant variables to a data structure in the firestore. <br>
```
//construct menu data object
const menuData = {
    tuesday_date: dateINPUT1,
    tuesday_entree: entreeINPUT1,
    tuesday_soup: soupINPUT1,
    tuesday_salad: saladINPUT1,
    tuesday_side: sideINPUT1,
    tuesday_dessert: dessertINPUT1,
    tuesday_closed: closedINPUT1,
    wednesday_date: dateINPUT2,
    wednesday_entree: entreeINPUT2,
    wednesday_soup: soupINPUT2,
    wednesday_salad: saladINPUT2,
    wednesday_side: sideINPUT2,
    wednesday_dessert: dessertINPUT2,
    wednesday_closed: closedINPUT2,
    thursday_date: dateINPUT3,
    thursday_entree: entreeINPUT3,
    thursday_soup: soupINPUT3,
    thursday_salad: saladINPUT3,
    thursday_side: sideINPUT3,
    thursday_dessert: dessertINPUT3,
    thursday_closed: closedINPUT3
};
```

<br>

This data can be seen in the firebase console as seen below: <br>
<img src="mdimages/firestoreConstruct.png" height="300px" width="600px"> <br>



This code is at the bottom of the script tag and it creates the dynamic file name with the timestamp and it handles the checks of the information that the user inputs. The alerts are shown at the top of the screen and the console messages can be seen in the web console after inspecting the page.  <br>
```
//generate a timestamp document name
                      const timestamp = new Date().toISOString();
                      const documentName = `menu_${timestamp}`;
//pushes up new data - error catches and alerts
setDoc(doc(db, "menu", "menuDocument"), menuData)
.then(() => {
    console.log("Menu published successfully!");
    alert("Menu published successfully!");
})
.catch((error) => {
    console.error("Error publishing menu: ", error);
    alert("Error publishing menu.");
});
})
.catch((error) => {
    console.error("Authentication failed: ", error);
    alert("Authentication failed.");
});
}
const submitBTN = document.getElementById("submitBTN");
submitBTN.addEventListener("click", submitForm);
</script>
```







## What does each file do?
### Full File List:
<img src="mdimages/fileList.png" height="500px" width="180px"> <br> 

### 'content' folder
This contains the images used within the website. <br> <br>

### 'README.md' and 'mdimages'
These files are only for the README, not to be changed. <br> <br>

### '.firebaserc'
This file sets the default firebase project ID - should not be changed. <br> <br>

### '.gitignore' 
This file has a list of file types that are ignored when changes are pushed. The only one that has been manually added is 'DS_Store', which is a file that macOS uses to store file arrangement data. <br> <br>

### 'database.rules.json'
This file contains the permissions for reading and writing of the data, but this file is blank. The actual reading and writing permssions can be found in the firebase console as seen below: <br>
<img src="mdimages/rules.png" height="270px" width="600px"> <br> <br>

### 'firebase.json'
This file contains the location for the public files. The "." sets the public location to the main directory. The 'rules' line sets the file location to the 'database.rules.json' file. 
```
{
  "hosting": {
    "public": ".",
    "rules": "database.rules.json"
  }
}
```

<br>

### 'package-lock.json'
This file contains the packages and dependencies used in the database - should not be changed. <br> <br>

### 'package.json'
This file contains project details and essential configurations for the database - should not be changed. 
