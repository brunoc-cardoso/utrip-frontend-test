export const getItemFromLocalStorage = ({ key }: { key: string }) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return null;
};

export const setItemOnLocalStorage = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  localStorage.setItem(key, value);
};
