import { unstable_rethrow } from "next/navigation";
import { connection } from "next/server";

export async function loadResult<T>(work: () => Promise<T>): Promise<{ ok: true; data: T } | { ok: false }> {
  await connection();
  try {
    return { ok: true, data: await work() };
  } catch (error) {
    unstable_rethrow(error);
    console.error(error);
    return { ok: false };
  }
}
