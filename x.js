// Replace HTML content
document.documentElement.innerHTML = `
  <html>
  <head>
    <title>Replaced Content</title>
    <style>
      #banner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: yellow;
        color: black;
        text-align: center;
        padding: 10px;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div id="banner">TEST</div>
  </body>
  </html>
`;

// Run an alert with document.domain
alert('Current document.domain: ' + document.domain);

// Display the moving banner
const banner = document.getElementById('banner');
let position = 0;

function moveBanner() {
  position += 2;
  if (position >= window.innerWidth - banner.clientWidth) {
    position = -banner.clientWidth;
  }
  banner.style.left = position + 'px';
  requestAnimationFrame(moveBanner);
}

moveBanner();
