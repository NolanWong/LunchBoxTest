//email form
function submitForm() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyFvmvd8SDnQMeCcoFO5VDtgvo5Ng4N4tquWaCETP5nVCtJnp5qm9DwFXTR7SXnlJTF/exec'
  const form = document.forms['submit-to-google-sheet']
  form.addEventListener('submit', e => {
    console.log("form listener activated")
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert('Success!', response))
    .catch(error => alert('Error!', error.message))
  })
}
//get form input values
//var email = document.getElementById('email').value;
//var firstName = document.getElementById('firstname').value;
//var lastName = document.getElementById('lastname').value;
//var comments = document.getElementById('comment').value;
//var foundOut = document.getElementById('foundOut').value;
//var mailingList = document.getElementById('mailingList').checked;
//check if required fields are not empty
//if (email.trim() === ''){//} || lastName.trim() === '' || comments.trim() === '') {
//    alert('Please add your email address!');
//    return;
//}
//create email content
//var fullName = `${firstName} ${lastName}`;
//var mailingListText = mailingList ? 'Yes' : 'No';
////construct the email content as a full sentence with new lines
//var emailContent = `My name is ${fullName} and my comment/question is "${comments}".\n`;
//if (foundOut.trim() !== '') {
//    emailContent += `I found out about this restaurant from ${foundOut}.\n`;
//}
//if (mailingList) {
//    emailContent += `I want to be part of the mailing list.\n`;
//} else {
//    emailContent += `I do not want to be part of the mailing list.\n`;
//}
////open email client with preloaded content
//emailContent="Hello!  I would like to join your weekly newsletters and updates!"
//window.location.href = 'mailto:samuel.wagoner@evsck12.com?subject=Contact Form Submission&body=' + encodeURIComponent(emailContent);