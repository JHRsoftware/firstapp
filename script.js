document.addEventListener("DOMContentLoaded", () => {
    // ——————————————
    // 1) Form submission logic
    const form = document.getElementById("clientForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const data = new URLSearchParams();
            data.append("action", "saveClient");
            data.append("name", form.name.value);
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
    const endpoint = 
        "https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec"
        + "?action=getClients&callback=renderClients";

    const tag = document.createElement("script");
    tag.src = endpoint;
    document.body.appendChild(tag);
});

// This function name must match the `callback` param above
function renderClients(clients) {
    const tbody = document.querySelector("#clientTable tbody");
    if (!Array.isArray(clients)) {
        console.error("Invalid data:", clients);
        return;
    }
    clients.forEach(client => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${client.name}</td>
            <td>${client.address}</td>
            <td>${client.contact}</td>
        `;
        tbody.appendChild(tr);
    });
}