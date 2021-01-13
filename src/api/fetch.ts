export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export default async <T>(
  url: string,
  method = "get",
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
): Promise<HttpResponse<T>> => {
  const controller = new AbortController();

  const res: HttpResponse<T> = await fetch(`${url}`, {
    signal: controller.signal,
    method: method.toUpperCase(),
    headers: { ...headers },
  });
  try {
    res.parsedBody = await res.json();
  } catch (ex) {}
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
};
