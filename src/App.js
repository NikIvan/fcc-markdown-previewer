
import marked from 'marked';
import {useEffect, useState} from 'react';
import ContentView from './components/content-view';

import classes from './App.module.css';

marked.setOptions({
  breaks: true,
});

function App() {
  const [editorText, setEditorText] = useState(EDITOR_EXAMPLE);
  const [isEditorExpanded, setEditorExpanded] = useState(false);
  const [isEditorVisible, setEditorVisible] = useState(true);

  const [previewText, setPreviewText] = useState(marked(editorText));
  const [isPreviewExpanded, setPreviewExpanded] = useState(false);
  const [isPreviewVisible, setPreviewVisible] = useState(true);
  
  useEffect(() => {
    setPreviewText(marked(editorText));
  }, [editorText]);

  useEffect(() => {
    setPreviewVisible(!isEditorExpanded);
  }, [isEditorExpanded]);

  useEffect(() => {
    setEditorVisible(!isPreviewExpanded);
  }, [isPreviewExpanded]);
  
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>Markdown previewer</header>
      <ContentView
        title="Editor"
        isExpanded={isEditorExpanded}
        isVisible={isEditorVisible}
        toggleExpanded={() => setEditorExpanded(!isEditorExpanded)}
      >
        <textarea
          className={classes.editor}
          id="editor"
          value={editorText}
          onChange={(e) => setEditorText(e.target.value)}
      ></textarea>
      </ContentView>
      <ContentView
        title="Preview"
        isExpanded={isPreviewExpanded}
        isVisible={isPreviewVisible}
        toggleExpanded={() => setPreviewExpanded(!isPreviewExpanded)}
      >
        <div
          id="preview"
          className={classes.preview}
          dangerouslySetInnerHTML={{__html: previewText}}
        ></div>
      </ContentView>
    </div>
  );
}

const EDITOR_EXAMPLE = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

export default App;
