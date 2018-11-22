import { makeDecorator } from "@storybook/addons";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const defaults = {
  markdown: "",
  customStyles: ""
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
# <!-- KIND -->

## <!-- STORY -->

### Example

<div class="with-any-info-example">
<!-- TEMPLATE -->
</div>

### Source code

\`\`\`
<!-- SOURCE -->
\`\`\`

`;

function addAnyInfo(storyFn, context, infoOptions) {
  let component = storyFn(context);

  const markdownTemplate =
    intro
      .replace("<!-- KIND -->", context.kind)
      .replace("<!-- STORY -->", context.story)
      .replace("<!-- SOURCE -->", component.template) +
    infoOptions.markdown;

  component.template = renderMarkdown(markdownTemplate, {
    headerPrefix: "mrkd-",
    highlight: function(code, lang, callback) {
      const result = hljs.highlight(lang || "html", code, true);
      return result.value;
    }
  }).replace("<!-- TEMPLATE -->", component.template);

  component.template += `<style>${infoOptions.customStyles}</style>`;
  return component;
}

function renderMarkdown(text, options) {
  return marked(text, { ...marked.defaults, ...options });
}
