import { type FileFormat, TypeLanguage } from "../../enums/file.enum";
import { contentToJson } from "./jsonAdapter";
import { generateJavaPojo } from "./jsonToPojo";

export const generateType = async (input: string, format: FileFormat, output: TypeLanguage) => {
  try {
    const inputToJson = await contentToJson(input, format);
    const jsonString = JSON.stringify(inputToJson);

    if (output === TypeLanguage.Java) {
      return generateJavaPojo(jsonString, "Root");
    } else {
      // Fallback to legacy system
      const { run } = await import("json_typegen_wasm");
      return run("Root", jsonString, JSON.stringify({ output_mode: output }));
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};

