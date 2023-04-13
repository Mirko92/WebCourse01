
/**
 * {
 *  tagName: string,
 *  example?: string = "<[tagName]>TagContent</[tagName]>",
 * }
 */
const tagDocsItems = [
  { tagName: "div",  description: "Block element."},
  { tagName: "span", description: "Inline element"},
  { tagName: "p",    description: "Paragraph element"},
  { tagName: "pre",  description: "PreFormatted text"},
  { tagName: "code", description: "Code container"},
  { 
    tagName: "ul",
    example: `
    <ul>
      <li>List item</li>
      ... list items ...
    </ul>
    `
  },
  { 
    tagName: "ol",
    example: `
    <ol>
      <li>List item</li>
      ... list items ...
    </ol>
    `
  },
  { tagName: "li", },
  { 
    tagName: "fieldset",
    example: `
    <fieldset>
      <legend>List item</legend>

      <!-- content -->
    </fieldset>
    `
  },
]

const menuElementTemplate = `
  <li>
    <a href="#{tagName}-example">{tagNameEncoded}</a>
  </li>
`;

const template = `
  <fieldset>
    <legend>{tagName}</legend>
    
    <pre><code class="language-html" id="{tagName}-example">{example}</code></pre>

    <div> {description} </div>
  </fieldset>
`;

const menuElements = [];
const tagElements  = [];

function createTagElement(item) {
  item.example ??= `<${item.tagName}>Tag Content</${item.tagName}>`;

  const el = template
              .replaceAll("{tagName}", item.tagName)
              .replace("{example}", cleanPreContent(item.example) )
              .replace("{description}", item.description);

  tagElements.push(el);
}

function createMenuElement(item) {
  const elString = menuElementTemplate
    .replace("{tagName}", item.tagName)
    .replace("{tagNameEncoded}", encodeHTMLEntities(`<${item.tagName.toUpperCase()}>`));

    menuElements.push(elString);
}

tagDocsItems.forEach((item) => {
  createMenuElement(item);
  createTagElement(item);
});

function renderMenuElements() {
  document
    .querySelector('section.tag-list-menu ul')
    .innerHTML = menuElements.join("");
}

function renderTagElements() {
  document
    .querySelector('section.tag-list-docs')
    .innerHTML = tagElements.join("");
}

function render() {
  renderMenuElements();
  renderTagElements();
}

render();
