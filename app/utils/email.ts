import { FormData } from "../_components/contactForm";

export function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";
  console.log(FormData)
  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
