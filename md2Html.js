import { JSDOM } from 'jsdom';
import { marked } from "marked";
import createDOMPurify from 'dompurify';

export default function Md2Html({ content }) {
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);

  const renderer = new marked.Renderer();
  const toc = [];

  renderer.heading = (text) => {
    const slug = text.text.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-');
    toc.push({ text, slug });
    return `<h${text.depth} id="${slug}">${text.text}</h${text.depth}>`;
  };

  const htmlContent = marked(content, { renderer });
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  return { cleanHtmlContent, toc };
}