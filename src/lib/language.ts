export interface Language {
  name: string;
  extension: string;
}

export const languages: Language[] = [
  { name: "abap", extension: "abap" },
  { name: "aes", extension: "aes" },
  { name: "apex", extension: "cls" },
  { name: "azcli", extension: "azcli" },
  { name: "bat", extension: "bat" },
  { name: "bicep", extension: "bicep" },
  { name: "brainfuck", extension: "b" },
  { name: "c", extension: "c" },
  { name: "cameligo", extension: "mligo" },
  { name: "clike", extension: "clike" },
  { name: "clojure", extension: "clj" },
  { name: "coffeescript", extension: "coffee" },
  { name: "cpp", extension: "cpp" },
  { name: "csharp", extension: "cs" },
  { name: "csp", extension: "csp" },
  { name: "css", extension: "css" },
  { name: "dart", extension: "dart" },
  { name: "dockerfile", extension: "dockerfile" },
  { name: "ecl", extension: "ecl" },
  { name: "elixir", extension: "ex" },
  { name: "erlang", extension: "erl" },
  { name: "flow9", extension: "flow" },
  { name: "freemarker2", extension: "ftl" },
  { name: "fsharp", extension: "fs" },
  { name: "go", extension: "go" },
  { name: "graphql", extension: "graphql" },
  { name: "handlebars", extension: "hbs" },
  { name: "hcl", extension: "hcl" },
  { name: "hcl", extension: "tf" },
  { name: "html", extension: "html" },
  { name: "ini", extension: "ini" },
  { name: "java", extension: "java" },
  { name: "javascript", extension: "js" },
  { name: "json", extension: "json" },
  { name: "jsx", extension: "jsx" },
  { name: "julia", extension: "jl" },
  { name: "kotlin", extension: "kt" },
  { name: "less", extension: "less" },
  { name: "lex", extension: "l" },
  { name: "lexon", extension: "lex" },
  { name: "liquid", extension: "liquid" },
  { name: "livescript", extension: "ls" },
  { name: "lua", extension: "lua" },
  { name: "m3", extension: "m3" },
  { name: "markdown", extension: "md" },
  { name: "mips", extension: "s" },
  { name: "msdax", extension: "dax" },
  { name: "mysql", extension: "sql" },
  { name: "nginx", extension: "nginx" },
  { name: "objective-c", extension: "m" },
  { name: "pascal", extension: "pas" },
  { name: "pascaligo", extension: "ligo" },
  { name: "perl", extension: "pl" },
  { name: "pgsql", extension: "pgsql" },
  { name: "php", extension: "php" },
  { name: "pla", extension: "pla" },
  { name: "plaintext", extension: "txt" },
  { name: "postiats", extension: "dats" },
  { name: "powerquery", extension: "pq" },
  { name: "powershell", extension: "ps1" },
  { name: "proto", extension: "proto" },
  { name: "pug", extension: "pug" },
  { name: "python", extension: "py" },
  { name: "qsharp", extension: "qs" },
  { name: "r", extension: "r" },
  { name: "razor", extension: "cshtml" },
  { name: "redis", extension: "redis" },
  { name: "redshift", extension: "sql" },
  { name: "restructuredtext", extension: "rst" },
  { name: "ruby", extension: "rb" },
  { name: "rust", extension: "rs" },
  { name: "sb", extension: "sb" },
  { name: "scala", extension: "scala" },
  { name: "scheme", extension: "scm" },
  { name: "scss", extension: "scss" },
  { name: "shell", extension: "sh" },
  { name: "sol", extension: "sol" },
  { name: "sparql", extension: "sparql" },
  { name: "sql", extension: "sql" },
  { name: "st", extension: "st" },
  { name: "stylus", extension: "styl" },
  { name: "swift", extension: "swift" },
  { name: "systemverilog", extension: "sv" },
  { name: "tcl", extension: "tcl" },
  { name: "toml", extension: "toml" },
  { name: "tsx", extension: "tsx" },
  { name: "twig", extension: "twig" },
  { name: "typescript", extension: "ts" },
  { name: "vb", extension: "vb" },
  { name: "vbscript", extension: "vbs" },
  { name: "verilog", extension: "v" },
  { name: "vue", extension: "vue" },
  { name: "xml", extension: "xml" },
];

function isDocker(file_name: string) {
  return file_name === "Dockerfile";
}

function defaultStrategy(file_name: string) {
  const extension = file_name.split(".").pop();
  return (
    languages.find((lang) => lang.extension === extension)?.name || "plaintext"
  );
}

export function getLanguage(file_name: string) {
  if (isDocker(file_name)) {
    return "dockerfile";
  }
  return defaultStrategy(file_name);
}