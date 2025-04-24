// backend/googleCalendar.js

const fs = require('fs');
const { google } = require('googleapis');

// Load client secrets
const credentials = JSON.parse(fs.readFileSync('google-calendar-credentials.json'));
const { client_secret, client_id, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Step 1: Generate Auth URL (send this to frontend)
function getAuthURL() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
}

// Step 2: Get Tokens using the code
async function setTokens(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}

// Step 3: Create a Calendar Event
async function createEvent(summary, description, startDateTime, endDateTime) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary,
    description,
    start: { dateTime: startDateTime, timeZone: 'Asia/Kolkata' },
    end: { dateTime: endDateTime, timeZone: 'Asia/Kolkata' },
  };

  return await calendar.events.insert({ calendarId: 'primary', requestBody: event });
}

module.exports = { getAuthURL, setTokens, createEvent };
