// app/prediction/[name]/page.tsx
export const dynamic = "force-dynamic"; // ensure page runs per-request

const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Agify fetch failed");
  return res.json();
};

const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Genderize fetch failed");
  return res.json();
};

const getPredictedNationality = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Nationalize fetch failed");
  return res.json();
};

interface Params {
  params: { name: string } | Promise<{ name: string }>;
}

export default async function Prediction({ params }: Params) {
  // unwrap params because it may be a Promise
  const { name } = await params;

  try {
    const [age, gender, nationality] = await Promise.all([
      getPredictedAge(name),
      getPredictedGender(name),
      getPredictedNationality(name),
    ]);

    const countryId = nationality?.country?.[0]?.country_id ?? "N/A";

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Personal Info
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">Age: {age?.age ?? "N/A"}</div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">Gender: {gender?.gender ?? "N/A"}</div>
          <div className="block mt-1 text-lg leading-tight font-medium text-black">Nationality: {countryId}</div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Prediction error:", err);
    return <div className="p-4">Error fetching predictions. Try again.</div>;
  }
}
