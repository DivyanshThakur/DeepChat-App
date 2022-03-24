import escapeHtml from "escape-html";
import { Text } from "slate";

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    if (node.strike) {
      string = `<span style={{ textDecoration: "line-through" }}>${string}</span>`;
    }

    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "emoji":
      console.log(node);
      return `<span>${node.character}</span>`;
    case "link":
      return `<a href="${escapeHtml(
        node.url
      )}" target="_blank" rel="noreferrer">${children}</a>`;
    default:
      return children;
  }
};

export default serialize;
