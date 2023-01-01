import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react';

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <>
      <Editor editorState={editorState} onChange={setEditorState}></Editor>
    </>
  );
}
