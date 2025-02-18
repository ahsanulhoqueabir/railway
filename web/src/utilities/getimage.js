const getImage = (path, name) => {
  return new URL(`../assets/${path}/${name}`, import.meta.url).href;
};

export default getImage;
