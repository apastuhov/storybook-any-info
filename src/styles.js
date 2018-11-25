import { styles } from "./styles-hl-github";

export const storyStyles = `
${styles}

#mrkd-root { padding: 0 20px; }

h1[id|="mrkd"] { font-size: 1.75em; }
h2[id|="mrkd"] { font-size: 1.5em; }
h3[id|="mrkd"] { font-size: 1.25em; }
[id|="mrkd"] {
    font-family: sans-serif;
}

#mrkd-root > .with-any-info-example {
    border: 2px dashed #ddd;
}

pre {
    padding: 10px;
    background: #eee;
    border-radius: 10px;
}

#mrkd-root > table th,
#mrkd-root > table td,
#mrkd-root > table {
    border-collapse: collapse;
    font-family: sans-serif;
    border: 1px solid #eee;
    text-align: left;
    padding: 15px;
}
`;
