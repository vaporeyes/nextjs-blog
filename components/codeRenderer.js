
import React, { memo, useEffect, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-dark.min.css";
// const hljs = require('highlight.js');

const CodeRenderer = ({ code }) => {
  //first we split the lines, the first line will be reserved for the language definition.
  //the next lines will be reserved for the code itself.
  const [lang, ...body] = code.split("\n");

  //get the language
  const language = lang.slice(1);
  //join the body
  const _body = body.join("\n");

  useEffect(() => {
    //create an async function to load the lanugages using import
    async function highlight() {
      await import(`prismjs/components/prism-${language}`);
      Prism.highlightAll();
    }
    highlight();
  }, [language, code]);

  return (
    <pre>
      <code className={`language-${language}`}>{_body}</code>
    </pre>
  );
};

export default memo(CodeRenderer);
