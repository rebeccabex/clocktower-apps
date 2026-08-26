type TokenColour = {
  type: TokenColourKeys;
  text: string;
};

export const tokenise = (jsonString: string) => {
  const tokens = Array<TokenColour>();
  // Order matters: strings (incl. keys), then punctuation, numbers, booleans/null
  const pattern =
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|[{}[\],]|-?\d+(\.\d+)?([eE][+-]?\d+)?|\btrue\b|\bfalse\b|\bnull\b|\s+/g;

  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(jsonString)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "plain",
        text: jsonString.slice(lastIndex, match.index),
      });
    }
    const text = match[0];
    let type = "plain" as TokenColourKeys;

    if (/^\s+$/.test(text)) {
      type = "whitespace";
    } else if (text.startsWith('"')) {
      type = text.trim().endsWith(":") ? "key" : "string";
    } else if (/^(true|false)$/.test(text)) {
      type = "boolean";
    } else if (text === "null") {
      type = "null";
    } else if (/^-?\d/.test(text)) {
      type = "number";
    } else if (/[{}[\]]/.test(text)) {
      type = "brace";
    } else if (text === ",") {
      type = "comma";
    }

    tokens.push({ type, text });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < jsonString.length) {
    tokens.push({ type: "plain", text: jsonString.slice(lastIndex) });
  }
  return tokens;
};

export const TOKEN_COLOURS = {
  key: "#7DD3FC", // light blue
  string: "#A5D6A7", // soft green
  number: "#F9A8D4", // pink
  boolean: "#FCD34D", // amber
  null: "#FCA5A5", // soft red
  brace: "#E5E7EB", // near-white
  comma: "#9CA3AF", // gray
  plain: "#E5E7EB",
  whitespace: undefined,
};
type TokenColourKeys = keyof typeof TOKEN_COLOURS;
