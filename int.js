// script.js

document.getElementById('startTest').addEventListener('click', startSpeedTest);

function startSpeedTest() {
    const downloadSpeedElement = document.getElementById('downloadSpeed');
    const uploadSpeedElement = document.getElementById('uploadSpeed');
    
    // Show loading text
    downloadSpeedElement.innerText = 'Loading...';
    uploadSpeedElement.innerText = 'Loading...';

    // Perform a download test using the Fast API
    fetch('https://api.fast.com/netflix/speedtest?https=true')
        .then(response => response.json())
        .then(data => {
            const downloadSpeed = (data.download / 1e6).toFixed(2); // Convert from bps to Mbps
            downloadSpeedElement.innerText = `${downloadSpeed} Mbps`;

            // Upload speed testing (use another API or test method for upload)
            // For simplicity, using download speed as a placeholder
            const uploadSpeed = (data.upload / 1e6).toFixed(2); // Convert from bps to Mbps
            uploadSpeedElement.innerText = `${uploadSpeed} Mbps`;
        })
        .catch(error => {
            console.error('Error fetching the speed test data', error);
            downloadSpeedElement.innerText = 'Error';
            uploadSpeedElement.innerText = 'Error';
        });
}