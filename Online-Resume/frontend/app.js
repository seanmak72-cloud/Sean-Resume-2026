window.addEventListener('DOMContentLoaded', () => {
    getVisitCount();
});

const getVisitCount = () => {
    // Azure SWA maps your API route seamlessly to '/api/{function_name}'
    fetch('/api/GetResumeCounter')
        .then(response => response.json())
        .then(data => {
            document.getElementById('counter').innerText = data.count;
        })
        .catch(error => console.error('Error fetching counter:', error));
}
