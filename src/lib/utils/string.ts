const modifyWord = (word: string) => {
  const firstChar = word.slice(0, 1).toUpperCase();
  const remainingChar = word.slice(1);
  return firstChar + remainingChar;
};

export const getSlugKey = (slug: string) => {
  const slugKey = slug
    .split("-")
    .map((word, index) => (index > 0 ? modifyWord(word) : word))
    .join("");

  return slugKey;
};
