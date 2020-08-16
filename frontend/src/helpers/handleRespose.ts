const reject = (error: number): Promise<{ error: 400 | 500 | 401 }> =>
  new Promise((_, reject) => reject({ error }));

const resolve = (a: 200 | 204): Promise<any> =>
  new Promise((resolve, _) => resolve(a));

export const handleResJSON = (res: Response) => {
  if (res.status === 200) return res.json();
  return reject(res.status);
};

export const handleResStatus = (res: Response) => {
  if (res.status === 200 || res.status === 204) return resolve(res.status);
  return reject(res.status);
};
