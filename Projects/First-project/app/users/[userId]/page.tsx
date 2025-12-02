import { promises } from "dns";
import { notFound } from "next/navigation";

async function fetchUserData(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (!response.ok) {
   return null;
  }
  const data = await response.json();
  return data;
}

export default async function UserPage({params}: {params: Promise<{userId: string}>;}) {
  
  const {userId} = await params;
  const user = await fetchUserData(userId);

  if(!user){
    notFound();
  }

  return (
    <>
    <div className="flex-col justify-center items-center">
      <h1>User Page:</h1>
      <p>This is the user page of my Next.js app.</p>  
    </div>

    <div >
      <h2 className=" text-white text-xl font-bold mb-2">User ID: {userId}</h2>
      <h2>User name: {user.name}</h2>
    </div>
    </>
  );
}
