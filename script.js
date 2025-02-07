document.addEventListener("DOMContentLoaded", function() {
    var mydiv = document.getElementById("map");

    var map = L.map(mydiv).setView([69, 69], 10); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});
