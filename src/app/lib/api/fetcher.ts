import type { AxiosResponse } from "axios";
import axios from "axios";

export async function fetcher<T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const message = (err.response.data as any)?.message ?? "Server error";

        // помилка з сервера
        throw new Error(message);
      } else {
        // мережна помилка або таймаут
        throw new Error(err.message);
      }
    }
    throw err; // невідома помилка
  }
}
