import fs from "fs/promises";
import handlebars from "handlebars";

export const compilatorHtml = async (archive: string, context: { [key: string]: any }): Promise<string> => {
  const html = await fs.readFile(archive);
  const compilator = handlebars.compile(html.toString());
  const htmlString = compilator(context);
  return htmlString;
};
