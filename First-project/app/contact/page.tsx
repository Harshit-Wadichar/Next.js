import ButtonComponent from "./button";

export default async function ContactPage() {

  console.log("hey this is server or client");

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(data);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the contact page of my Next.js app.</p>
      <ButtonComponent/>
    </div>
  );
}
