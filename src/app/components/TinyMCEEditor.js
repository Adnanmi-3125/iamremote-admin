"use client"; // Mark this component as a client component

import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ value = '', onChange }) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    if (editorRef.current && value !== editorValue) {
      setEditorValue(value);
    }
  }, [value]);

  const handleEditorChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <Editor
    apiKey='7hbiu0lwsdd2d0f0dwxv90nl35cd6hwe66lgvcht860csc5c'
      onInit={(evt, editor) => editorRef.current = editor}
      value={editorValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
