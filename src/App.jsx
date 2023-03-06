import {Button, Table} from "antd"
import {useState} from 'react'
import plist from 'plist';
import './App.css'
import DragDropComponent from "./components/DragDropComponent.jsx";
import {HomeOutlined} from "@ant-design/icons";

;

function App() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const readUploadFile = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileUploaded = e.target.result;
                const parsedData = plist.parse(fileUploaded);

                const newObj = Object.entries(parsedData).reduce((acc, [key, value]) => {
                    acc[key] = String(value);
                    return acc;
                }, {});

                const dataSource = Object.entries(newObj).map(([key, value]) => ({
                    key: key,
                    value: value,
                }));

                setData(dataSource);
                setFile(fileUploaded);
                // let col = Object.keys(parsedData).map(key => ({
                //     title: key,
                //     dataIndex: key,
                //     key,
                // }))
                const col = [
                    {
                        title: 'Key',
                        dataIndex: 'key',
                        width: '50%'
                    },
                    {
                        title: 'Value',
                        dataIndex: 'value',
                        width: '50%'
                    },
                ];
                setColumns(col)
            };
            reader.readAsText(file[0]);
        }
    }
    return (
        <div style={{height: '100%'}}>
            {!file
                ?
                <DragDropComponent onDrop={readUploadFile}/>
                :
                <div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 10}}>
                        <Button onClick={() => setFile(null)}>
                            <HomeOutlined />
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: "70vh" }} />
                </div>
            }

        </div>
    )
}

export default App
