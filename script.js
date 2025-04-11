document.getElementById("clientForm").addEventListener("submit", function(e){
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      address: form.address.value,
      contact: form.contact.value
    };
  
    fetch("https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(response => alert(response))
    .catch(error => console.error("Error!", error.message));
  });
  