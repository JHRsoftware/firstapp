document.getElementById("clientForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default form submission
  
    const form = e.target;
    const data = new URLSearchParams();
    data.append("name", form.name.value);
    data.append("address", form.address.value);
    data.append("contact", form.contact.value);
  
    fetch("https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec", {
      method: "POST",
      body: data
    })
    .then(res => res.text())
    .then(response => {
      document.getElementById("responseMessage").innerText = response;
      form.reset(); // optional: clear the form
    })
    .catch(error => {
      document.getElementById("responseMessage").innerText = "Error: " + error.message;
    });
  });
  