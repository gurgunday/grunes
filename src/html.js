const escapeDictionary = {
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

const escapeRegExp = new RegExp(
  `[${Object.keys(escapeDictionary).join("")}]`,
  "gv",
);

const escapeFunction = (key) => {
  return escapeDictionary[key];
};

/**
 * @param {{ raw: string[] }} literals
 * @param {...*} expressions
 * @returns {string}
 */
const html = ({ raw: literals }, ...expressions) => {
  const lastLiteralIndex = literals.length - 1;
  let accumulator = "";

  if (lastLiteralIndex === -1) {
    return accumulator;
  }

  for (let index = 0; index < lastLiteralIndex; ++index) {
    let literal = literals[index];
    let expression =
      typeof expressions[index] === "string"
        ? expressions[index]
        : expressions[index] == null
          ? ""
          : Array.isArray(expressions[index])
            ? expressions[index].join("")
            : `${expressions[index]}`;

    if (literal.length && literal.charCodeAt(literal.length - 1) === 33) {
      literal = literal.slice(0, -1);
    } else if (expression.length) {
      expression = expression.replace(escapeRegExp, escapeFunction);
    }

    accumulator += literal += expression;
  }

  accumulator += literals[lastLiteralIndex];

  return accumulator;
};

export { html };
