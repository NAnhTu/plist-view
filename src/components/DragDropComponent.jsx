import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const { Dragger } = Upload;

function DragDropComponent({onDrop}) {

    return (
        <Dragger name='file' multiple={false} onDrop={e => onDrop(e.dataTransfer.files)}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
    );
}

export default DragDropComponent;
