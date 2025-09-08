export enum FileFormat {
  "JSON" = "json",
  "YAML" = "yaml",
  "XML" = "xml",
  "TOML" = "toml",
  "CSV" = "csv",
}

export const formats = [
  { value: FileFormat.JSON, label: "JSON" },
  { value: FileFormat.YAML, label: "YAML" },
  { value: FileFormat.XML, label: "XML" },
  { value: FileFormat.CSV, label: "CSV" },
];

export enum TypeLanguage {
  Java = "java",
}

export const typeOptions = [
  {
    label: "Java",
    value: TypeLanguage.Java,
    lang: "java",
  },
];
