let url = "http://127.0.0.1:8000/api/users/";
export const listing = async () => {
  return await fetch(url).then((response) => response.json());
};
