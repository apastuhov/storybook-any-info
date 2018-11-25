# storybook-any-info

[![NPM version](https://img.shields.io/npm/v/storybook-any-info.svg?style=flat)](https://www.npmjs.com/package/storybook-any-info) [![NPM downloads](https://img.shields.io/npm/dm/storybook-any-info.svg?style=flat)](https://npmjs.org/package/storybook-any-info)

This is an addon to render your Stories as full-featured markdown documentation with a [storybook][1]. Allows to render source template near the live example.

Addon was tested with version **4.0.0** of a storybook.

![screenshot.png](https://raw.githubusercontent.com/apastuhov/storybook-any-info/master/screenshot.png)

## TOC

- [Install](#install)
- [Prerequisites = **WARNING**](#prerequisites--warning)
- [Usage](#usage)
  - [Parameters](#parameters)
  - [Example](#example)
  - [CSS styling](#css-styling)
  - [Support Markdown docs for Angular](#support-markdown-docs-for-angular)

## Install

```bash
npm install storybook-any-info --save-dev
```

## Prerequisites = **WARNING**

- That addon modifies your story output.
- Currently only `template`-stories supported.
- Addon is not covered with tests yet, use it wisely :)

There are tasks to fix some issues. Soon [TODO](https://github.com/apastuhov/storybook-any-info/blob/master/TODO.md) list will be moved to GitHub issues.

## Usage

1. Write markdown file near your story.
2. Import `*.md` file to your story, check if build will not fail. (Find Angular workaround in the bottom of the docs)
3. Add decorator and parameters.

   ```js
   .addDecorator(withAnyInfo)
   .addParameters({
       anyinfo: {
           customStyles: "div {background: #0f0;}",
           markdown: "## Custom markdown header",
       }
   })
   ```

### Parameters

Here are options for `anyinfo` parameter:

| name         | type   | required |
| ------------ | ------ | -------- |
| customStyles | string | No       |
| markdown     | string | No       |

### Example

This is a final example with Angular:

```ts
import { withAnyInfo } from "storybook-any-info";
import * as markdown from "./README.md"; // Related docs file
import { Button } from "@storybook/angular/demo"; // Do not forget to replace with your component

storiesOf("Button", module)
  .addDecorator(withAnyInfo)
  .addParameters({
    anyinfo: {
      customStyles: "div {background: #0f0;}",
      markdown: "## Custom markdown header"
    }
  })
  .add("with text", () => ({
    moduleMetadata: {
      declarations: [Button]
    },
    template: `<storybook-button-component [text]="text"></storybook-button-component>`,
    props: {
      text: "Hello Button"
    }
  }));
```

### CSS styling

You can setup your own styling, or use predefined one from exported variable `storyStyles`.

### Support Markdown docs for Angular

Add `types.d.ts` with next content to `.storybook` directory:

```ts
declare module "*.md" {
  const value: string;
  export default value;
}
```

And add it to your `.storybook/tsconfig.json`:

```json
{
  // ...
  "include": [
    "./types.d.ts"
    // ...
  ]
}
```

[1]: https://github.com/storybooks/storybook
