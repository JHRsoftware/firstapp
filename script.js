document.getElementById("clientForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const form = e.target;
    const data = new URLSearchParams();
    data.append("action",  "saveClient");       // ← Must match your Apps Script check
    data.append("name",    form.name.value);
    data.append("address", form.address.value);
    data.append("contact", form.contact.value);
  
    fetch("https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec", {
      method: "POST",
      body: data
    })
    .then(res => res.text())
    .then(response => {
      document.getElementById("responseMessage").innerText = response;
      form.reset();
    })
    .catch(error => {
      document.getElementById("responseMessage").innerText = "Error: " + error.message;
    });
  });
  
//////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const endpoint = "https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec?action=getClients";
  
    fetch(endpoint)
      .then(response => response.json())
      .then(clients => {
        const tbody = document.querySelector("#clientTable tbody");
        clients.forEach(client => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${new Date(client.date).toLocaleString()}</td>
            <td>${client.name}</td>
            <td>${client.address}</td>
            <td>${client.contact}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error loading clients:", error);
      });
  });
  
  