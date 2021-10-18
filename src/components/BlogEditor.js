import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default function BlogEditor(props) {
    const [editorState, setEditorStator] = useState('')
    useEffect(() => {  
        const html = props.content
        if (html === undefined) {
            return
        }else{
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorStator(editorState)
            }
        }    
    },[props.content])

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => setEditorStator(editorState)}
                onBlur={() =>
                    props.collectBlog(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            />
        </div>
    )
}

