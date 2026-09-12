window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded. Initiating visitor counter fetch request...");
    getVisitCount();
});

const getVisitCount = () => {
    // Azure SWA automatically routes this to your backend function
    fetch('/api/GetResumeCounter')
        .then(response => {
            console.log("Server response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP status code error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received from DB successfully:", data);
            document.getElementById('counter').innerText = data.count;
        })
        .catch(error => {
            console.error('Fetch operation failed:', error);
            // Changes the text so you instantly know it hit a bug instead of hanging forever
            document.getElementById('counter').innerText = "Failed to communicate with API database";
        });
}
