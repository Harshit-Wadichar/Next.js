
export default async function Page({params}: {params: Promise<{slug: string}>;}) {
  const languages = ["python", "javascript", "java", "cpp", "cs"] as const;
  const {slug} = await params;

  if (languages.includes(slug)) {
    return <div>My Post: {slug}</div>;
  } else {
    return <div>Post not found</div>;
  }
}
