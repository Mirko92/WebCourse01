
/**
 * {
 *  tagName: string,
 *  example?: string = "<[tagName]>TagContent</[tagName]>",
 * }
 */
const tagDocsItems = [
  { tagName: "article",       description: "Semantic container: An article should make sense on its own, and it should be possible to distribute it independently from the rest of the web site. Forum posts, blog posts..."  },
  { tagName: "aside",         description: "Semantic container: The <aside> element defines some content aside from the content it is placed in (like a sidebar)."  },
  { tagName: "b",             description: "Bold characters"  },
  { tagName: "button",        description: "Actionable element."  },
  { tagName: "code",          description: "Semantic container: Code container"      },
  { 
    tagName: "details",       description: "Semantic container: Defines additional details that the user can view or hide",
    example: `
    <details>
      <summary>Visible text</summary>
      <span>Hidden content</span>
    </details>
    `
  },
  { tagName: "div",           description: "Block element."      },
  { tagName: "figcaption",    description: "Semantic container: The <figcaption> tag defines a caption for a <figure> element. "  },
  { tagName: "figure",        description: "Semantic container: The <figure> tag specifies self-contained content, like illustrations, diagrams, photos, code listings, etc."  },
  { tagName: "footer",        description: "Semantic container: The <footer> element defines a footer for a document or section."  },
  { tagName: "header",        description: "Semantic container: The <header> element represents a container for introductory content or a set of navigational links. Tipically contains or or more <h1> - <h6>"  },
  { tagName: "i",             description: "Italic font style"      },
  { tagName: "img",           description: "Semantic container: The <img> element defines the actual image/illustration. "      },
  { 
    tagName: "input",         description: "Input element.",
    example: `<input type="text" name="inputField" value="" />`
  },
  { tagName: "label",         description: "Semantic container: Defines a label for an input; It's also usefull to expand focus area of an input."  },
  { tagName: "main",          description: "Semantic container: Specifies the main content of a document"  },
  { tagName: "mark",          description: "Semantic container: Defines marked/highlighted text"  },
  { tagName: "nav",           description: "Semantic container: The <nav> element defines a set of navigation links."  },
  { tagName: "p",             description: "Paragraph element"   },
  { tagName: "pre",           description: "PreFormatted text"   },
  { tagName: "span",          description: "Inline element"      },
  { tagName: "section",       description: "Semantic container: The <section> element defines section in a document."  },
  { tagName: "summary",       description: "Semantic container: Defines a visible heading for a <details> element"  },
  { tagName: "table",         description: "Semantic container: Table layout. To organize a dataset in a table."  },
  { tagName: "time",          description: "Semantic container: Defines a date/time"  },
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
  <fieldset class="tag-element">
    <legend>{tagName}</legend>
    
    <pre><code class="language-html" id="{tagName}-example">{example}</code></pre>

    <div class="description"> {description} </div>

    <!-- example -->
    <!--<div>This is in a div</div>-->
  </fieldset>
`;

const menuElements = [];
const tagElements  = [];

function createTagElement(item) {
  item.example ??= `<${item.tagName}>Tag Content</${item.tagName}>`;

  const el = template
              .replaceAll("{tagName}", item.tagName)
              .replace("{example}", cleanPreContent(item.example) )
              .replace("{description}", encodeHTMLEntities(item.description || "") );

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

function renderMenuElements(filter) {
  let menuElementsToRender = menuElements;

  if (filter) {
    menuElementsToRender = menuElements.filter(m => m.includes(filter));
  }

  document
    .querySelector('section.tag-list-menu ul')
    .innerHTML = menuElementsToRender?.join("") || "No results";
}

function renderTagElements() {
  document
    .querySelector('section.tag-list-docs')
    .innerHTML = tagElements.join("") ;
}

let inputDebouncer = null; 
function handleSearch() {
  const searchInput = document.querySelector("#search-input");

  searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    const value = e.target.value;

    clearTimeout(inputDebouncer);

    inputDebouncer = setTimeout(() => {
      console.log("Value", value);
      refreshMenu(value);
    }, 200);
  });
}

function removeMenuElements() {
  document
    .querySelector('section.tag-list-menu ul')
    ?.replaceChildren();
} 

function render() {
  handleSearch();
  renderMenuElements();
  renderTagElements();
}

function refreshMenu(filter) {
  removeMenuElements();
  renderMenuElements(filter);
}

render();
