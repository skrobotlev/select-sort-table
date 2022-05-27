export const request = async () => {
  const req = await fetch("http://localhost:3000/people");
  const res = await req.json();
  return res;
};
