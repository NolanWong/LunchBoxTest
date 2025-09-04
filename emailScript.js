function emailResults() {
   const closedCHECKBOX1 = document.getElementById('closedCHECKBOX1');
   const closedINPUT1 = closedCHECKBOX1.checked ? "CLOSED" : " ";
//    const closedCHECKBOX2 = document.getElementById('closedCHECKBOX2');
//    const closedINPUT2 = closedCHECKBOX2.checked ? "CLOSED" : " ";
   const closedCHECKBOX3 = document.getElementById('closedCHECKBOX3');
   const closedINPUT3 = closedCHECKBOX3.checked ? "CLOSED" : " ";

   const email = document.getElementById('emailINPUT').value;
   const tuesDate = document.getElementById('dateINPUT1').value;
   const tuesEntree = document.getElementById('entreeINPUT1').value;
   const tuesSoup = document.getElementById('soupINPUT1').value;
   const tuesSalads = document.getElementById('saladINPUT1').value;
   const tuesSides = document.getElementById('sideINPUT1').value;
   const tuesDesserts = document.getElementById('dessertINPUT1').value;

//    const wedDate = document.getElementById('dateINPUT2').value;
//    const wedEntree = document.getElementById('entreeINPUT2').value;
//    const wedSoup = document.getElementById('soupINPUT2').value;
//    const wedSalads = document.getElementById('saladINPUT2').value;
//    const wedSides = document.getElementById('sideINPUT2').value;
//    const wedDesserts = document.getElementById('dessertINPUT2').value;

   const thursDate = document.getElementById('dateINPUT3').value;
   const thursEntree = document.getElementById('entreeINPUT3').value;
   const thursSoup = document.getElementById('soupINPUT3').value;
   const thursSalads = document.getElementById('saladINPUT3').value;
   const thursSides = document.getElementById('sideINPUT3').value;
   const thursDesserts = document.getElementById('dessertINPUT3').value;

   let tuesEmail, wedEmail, thursEmail;

   if (closedINPUT1 == "CLOSED") {
       tuesEmail = `Tuesday\t${tuesDate}\nClosed!\n\n`;
   } else {
       tuesEmail =
       `
Tuesday ${tuesDate}
         Entrée - ${tuesEntree}
         Soup - ${tuesSoup}
         Salads - ${tuesSalads}
         Sides - ${tuesSides}
         Desserts - ${tuesDesserts}`;
   }

//    if (closedINPUT2 == "CLOSED") {
//        wedEmail = `Wednesday\t${wedDate}\nClosed!\n\n`;
//    } else {
//        wedEmail =
//        `
// Wednesday ${wedDate}
//          Entrée - ${wedEntree}
//          Soup - ${wedSoup}
//          Salads - ${wedSalads}
//          Sides - ${wedSides}
//          Desserts - ${wedDesserts}`;
//    }

   if (closedINPUT3 == "CLOSED") {
       thursEmail = `Thursday\t${thursDate}\nClosed!\n\n`;
   } else {
       thursEmail =
       `
Thursday ${thursDate}
         Entrée - ${thursEntree}
         Soup - ${thursSoup}
         Salads - ${thursSalads}
         Sides - ${thursSides}
         Desserts - ${thursDesserts}`;
   }

//    The following should be pasted in if Chef wants Wednesday back: ${wedEmail}
   var emailContent = 
`Hello,
Below is our menu for this upcoming week. Be sure to stay up-to-date with our menu at https://sictccs.github.io/LunchBox/
${tuesEmail}
${thursEmail}
`;

   window.location.href = 'mailto:' + encodeURIComponent(email) + '?subject=Weekly Menu&body=' + encodeURIComponent(emailContent);
}
