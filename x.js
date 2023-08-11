// Define the URL to fetch the profile page
const profileUrl = 'https://outfitters.stage.sugariapps.com/members/xploiterr-d29379/profile';

// Define the headers for the GET request
const getHeaders = {
  Accept: 'text/html',
};

// Send the GET request to fetch the profile page
fetch(profileUrl, {
  method: 'GET',
  headers: getHeaders,
  credentials: 'include', // Include cookies in the request
})
  .then(response => response.text())
  .then(html => {
    // Extract the value of fuel_csrf_token from the response HTML
    const csrfTokenMatch = html.match(/<input name="fuel_csrf_token" value="([^"]+)" type="hidden"/);
    if (csrfTokenMatch && csrfTokenMatch[1]) {
      const csrfToken = csrfTokenMatch[1];

      // Now you have the csrf token value, you can use it in the POST request
      const email = 'Test@test.com';
      const postUrl = 'https://outfitters.stage.sugariapps.com/rest/members/editemail';
      const postHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const postBody = `email=${encodeURIComponent(email)}&fuel_csrf_token=${encodeURIComponent(csrfToken)}`;

      // Send the POST request
      fetch(postUrl, {
        method: 'POST',
        headers: postHeaders,
        body: postBody,
        credentials: 'include', // Include cookies in the request
      })
        .then(response => response.text())
        .then(data => {
          console.log('POST Response:', data);
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
    } else {
      console.error('fuel_csrf_token not found in the response HTML');
    }
  })
  .catch(error => {
    console.error('GET Error:', error);
  });
