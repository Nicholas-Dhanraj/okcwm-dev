import { FormData } from "../_components/contactForm";

export function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";
  console.log(data)
  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
