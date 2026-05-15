export function walk(node, callback) {
  if (!node || typeof node !== "object") {
    return;
  }

  callback(node);

  for (const key in node) {
    const child = node[key];

    if (Array.isArray(child)) {
      child.forEach((item) => {
        walk(item, callback);
      });
    } else if (typeof child === "object") {
      walk(child, callback);
    }
  }
}