
export default async function Page({params}: {params: Promise<{val: []}>;}) {
  const Params = await params;
  console.log(Params)
  return <div>I am about page check console</div>;
}
