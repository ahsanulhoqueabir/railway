const getImage = (path: string, name: string) => {
  return new URL(`../assets/${path}/${name}`, import.meta.url).href;
};

export default getImage;
