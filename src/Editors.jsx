import React, {useEffect, useState} from 'react';
import './Editors.css';
import {initialText, modifiedTextA, modifiedTextB} from './initialText';
import {merge} from 'node-diff3';

function Editors() {
  const [InitialText] = useState(initialText);
  const [ModifiedtextA] = useState(modifiedTextA);
  const [ModifiedtextB] = useState(modifiedTextB);
  const [DiffText, setDiffText] = useState();
  useEffect(() => {
    const result = merge(ModifiedtextA, InitialText, modifiedTextB, {
      stringSeparator: /[\r\n]+/,
      label: {a: 'A changes', b: 'B changes'},
    });
    console.log(result);
    const merged = result.result.join('\n');
    setDiffText(merged);
  }, [InitialText, ModifiedtextA, ModifiedtextB]);
  return (
    <>
      <div className="editor-inline">
        <p>
          <strong>Base</strong>
        </p>
        <textarea value={InitialText} />
      </div>
      <div className="editor-inline">
        <p>
          <strong>A Changes</strong>
        </p>
        <textarea value={ModifiedtextA} />
      </div>
      <div className="editor-inline">
        <p>
          <strong>B Changes</strong>
        </p>
        <textarea value={ModifiedtextB} />
      </div>
      <div className="editor-inline">
        <p>
          <strong>Merged</strong>
        </p>
        <textarea value={DiffText} readOnly />
      </div>
    </>
  );
}

export default Editors;
