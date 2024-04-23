export const removeTagsFromText = ({ text }: { text: string }) => {
  return text
    .replace("<p>", "")
    .replace("</p>", "")
    .replace("<b>", "")
    .replace("</b>", "");
};
