"use client";

import { submitAction } from "@/actions/form";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLFormElement | null>(null);

  return (
    <div className="w-2/3 mx-auto my-12">
      <form
        ref={ref}
        action={async (formData: FormData) => {
          await submitAction(formData);
          ref.current?.reset();
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="text-black bg-amber-50 mx-4"
            type="text"
          />
        </div>

        <div>
          <label htmlFor="add">Address</label>
          <input
            name="add"
            id="add"
            className="text-black bg-amber-50 mx-4"
            type="text"
          />
        </div>

        <div>
          <button className="border border-white px-3">Submit</button>
        </div>
      </form>
    </div>
  );
}
