"use client";
import { useState } from 'react';

async function makePostRequest() {
  const res = await fetch(`/api/hello`, { //need to put full url in case of server component like this ${process.env.NEXT_URL}/api/hello
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: "Pedro" }),
  });

  const data = await res.json();
  return { data };
}


export default async function Friends() {
 const [message, setMessage] = useState("");
  const onClick = async () => {
    const { data } = await makePostRequest();
    setMessage(data.message);
  };

  return (
    <h1>
      Hey Friends, {message} <button onClick={onClick}>Click Here</button>
    </h1>
  );
}