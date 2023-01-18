import { Editor, EditorState } from 'draft-js';
import React, { useState } from 'react';

//text에 밑줄, 이탤릭체, 볼드등을 수정할 수 있는 툴 컴포넌트
//생각보다 할 게 많아서 우선 임시 파일만 만들어둠, 사용하지 않을 수도...

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
