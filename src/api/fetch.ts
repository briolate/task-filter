export default async <T>(
  url: string,
  method = "get",
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
): Promise<T | { error: string }> => {
  const controller = new AbortController();
  try {
    const res = await fetch(`${url}`, {
      signal: controller.signal,
      method: method.toUpperCase(),
      headers: { ...headers },
    });
    if (!res.ok) {
      const error = await res.json();
      return { error: error.code };
    }
    return await res.json();
  } catch (err) {
    return { error: err };
  } finally {
    controller.abort();
  }
};
