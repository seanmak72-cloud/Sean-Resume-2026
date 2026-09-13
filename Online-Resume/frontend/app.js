window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content fully loaded. Initiating visitor tracking...");
    getVisitCount();
});

const getVisitCount = () => {
    // Azure SWA maps this path straight to your GetResumeCounter background function
    fetch('/api/GetResumeCounter')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server returned HTTP status code: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Database connection successful. Counter item retrieved:", data);
            
            // Locates the unique container ID inside your gray design box
            const counterElement = document.getElementById('counter');
            if (counterElement) {
                counterElement.innerText = data.count;
            }
        })
        .catch(error => {
            console.error('Visitor counter fetch framework execution dropped:', error);
            const counterElement = document.getElementById('counter');
            if (counterElement) {
                counterElement.innerText = "Unavailable";
            }
        });
}
