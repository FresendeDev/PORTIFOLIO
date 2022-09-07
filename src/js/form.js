// https://formspree.io/

var form = document.getElementById("form-contact");
document.getElementById("my-form-status").style.display = "none";

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("my-form-status").style.display = "block";
        document.getElementById("form-contact").style.display = "none";
        status.innerHTML = "Mensagem enviada com sucesso!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML =
              "Ops! Infelizmente ocorreu um problema ao enviar sua mensagem, tente outra forma de envio-1";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML =
        "Ops! Infelizmente ocorreu um problema ao enviar sua mensagem, tente outra forma de envio-2";
    });
}
form.addEventListener("submit", handleSubmit);
