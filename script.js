document.addEventListener("DOMContentLoaded", () => {
    // ——————————————
    // 1) Form submission logic
    const form = document.getElementById("clientForm");
    if (form) {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append("action", "saveClient");
        data.append("name",    form.name.value);
        data.append("address", form.address.value);
        data.append("contact", form.contact.value);
  
        fetch("https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec", {
          method: "POST",
          body: data
        })
        .then(r => r.text())
        .then(msg => {
          document.getElementById("responseMessage").innerText = msg;
          form.reset();
        })
        .catch(err => {
          document.getElementById("responseMessage").innerText = "Error: " + err.message;
        });
      });
    }
  
    // ——————————————
    // 2) Client‑list rendering logic
    const tableBody = document.querySelector("#clientTable tbody");
    if (tableBody) {
      const endpoint = 
        "https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec"
        + "?action=getClients";
  
      fetch(endpoint)
        .then(res => res.json())
        .then(clients => {
          clients.forEach(client => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${client.name}</td>
              <td>${client.address}</td>
              <td>${client.contact}</td>
            `;
            tableBody.appendChild(tr);
          });
        })
        .catch(err => console.error("Error loading clients:", err));
    }
  });
  