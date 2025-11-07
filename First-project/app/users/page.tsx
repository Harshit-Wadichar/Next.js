
export default async function Users() {

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  console.log(data);

  return (
    <>
    <div className="flex-col justify-center items-center">
      <h1>Users Page:</h1>
      <p>This is the user page of my Next.js app.</p>
      
    </div>

    <div >
      {data.map((item: { id: number; name: string}) => (
        <li key={item.id} className="border-2 m-5 p-5 rounded-md shadow-md mt-10">
          <h2 className=" text-white text-xl font-bold mb-2">{item.name}</h2>  
        </li>
      ))}
    </div>
    </>
  );
}
