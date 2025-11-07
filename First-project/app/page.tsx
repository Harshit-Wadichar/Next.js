import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/St_Michael%27s_Mount_II5302_x_2982.jpg/960px-St_Michael%27s_Mount_II5302_x_2982.jpg"
      width={300}
      height={100}
      alt="mountain image"/>
     <div className="m-5 text-4xl ">
      I want to travel around the world on my own
     </div>
    </div>
  );
}
