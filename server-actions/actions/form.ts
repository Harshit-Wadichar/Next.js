"use server";

import fs from "fs/promises";

export const submitAction = async (e: FormData): Promise<void> => {
  const name = e.get("name");
  const add = e.get("add");

  console.log(name, add);

  await fs.writeFile(
    "harshit.txt",
    `Name is ${String(name)} and Address is ${String(add)}`
  );
};
