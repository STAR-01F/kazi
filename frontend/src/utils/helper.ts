const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getDisplayName = (fullname: string) => {
  const name = fullname.split(' ');
  if (name.length > 2) {
    return `${name[0]} ${name[1]}`;
  }
  return name[0];
};

export {capitalizeFirstLetter, getDisplayName};
