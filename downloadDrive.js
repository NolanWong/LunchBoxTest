import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';
const button=document.getElementById("DWNLDBTTN");
/**
 * Downloads a file from Google Drive.
 */
async function downloadFile() {
  // Authenticate with Google and get an authorized client.
  // TODO (developer): Use an appropriate auth mechanism for your app.
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive',
  });

  // Create a new Drive API client (v3).
  const service = google.drive({version: 'v3', auth});

  // Download the file.
  const file = await service.files.get("1tbkIdEZEzGHwAh6FviA-WMZFBTjzcyXlk3KZSlNJocY");

  // Print the status of the download.
  console.log(file.status);
  return file.status;
}
button.addEventListener("click",downloadFile)