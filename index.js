import { makeDecorator } from "@storybook/addons";
import marked from "marked";
import hljs from "highlight.js";
import { storyStyles } from "./styles.js";
export * from "./styles.js";

const defaults = {
  markdown: "",
  customStyles: storyStyles
};

export const withAnyInfo = makeDecorator({
  name: "withAnyInfo",
  parameterName: "anyinfo",
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options;
    const mergedOptions = { ...defaults, ...options, ...storyOptions };
    return addAnyInfo(getStory, context, mergedOptions);
  }
});

const intro = `
<div id="mrkd-root">

# <!-- KIND --> <small><!-- STORY --></small>

### Example

<div class="with-any-info-example">
<!-- TEMPLATE -->
</div>

### Source code

\`\`\`
<!-- SOURCE -->
\`\`\`

<!-- MD -->

<!-- STYLES -->

</div>
`;

function addAnyInfo(storyFn, context, infoOptions) {
  let component = storyFn(context);
  const storyTemplate = component.template;

  const markdownTemplate = intro
    .replace("<!-- KIND -->", context.kind)
    .replace("<!-- STORY -->", context.story)
    .replace("<!-- SOURCE -->", storyTemplate)
    .replace("<!-- MD -->", infoOptions.markdown);

  component.template = renderMarkdown(markdownTemplate, {
    headerPrefix: "mrkd-",
    highlight: function(code, lang, callback) {
      const result = hljs.highlight(lang || "html", code, true);
      return result.value;
    }
  })
    .replace("<!-- TEMPLATE -->", storyTemplate)
    .replace("<!-- STYLES -->", `<style>${infoOptions.customStyles}</style>`);

  return component;
}

function renderMarkdown(text, options) {
  return marked(text, { ...marked.defaults, ...options });
}
