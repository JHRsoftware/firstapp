document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
     fetch("https://script.google.com/macros/s/AKfycbxe6LjyikzwB0aPInQvd1lEXZqrBQZT2ylB00AMSbb87vXsILLC8HSqu4p-mF_E0JuL/exec", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            },
            mode: "cors"
          })
          
      .then(res => res.text())
      .then(msg => alert("Submitted!"))
      .catch(err => alert("Error: " + err.message));
  });
  