

import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import DataViewModal from './assests/dataViewModal';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';


interface DataTableProps {
    data1: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data1 }) => {

    interface Item {
        key: string;
        name?: string;
        avatar?: string;
        category?: string;
        city?: string;
        country?: string;
        createdAt?: string;
        donationlink?: string;
        email?: string;
        intro?: string;
        password?: string;
        phonenumber?: number;
        username?: string;
        website?: string;
        location?: string
    }


    interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: string;
        inputType: 'number' | 'text' | 'string';
        record: Item;
        index: number;
        children: React.ReactNode;
    }

    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };


    const [form] = Form.useForm();
    const [data, setData] = useState(data1);
    const [editingKey, setEditingKey] = useState('');

    const [deleteingKey, setDeleteingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const isDeleting = (record: Item) => record.key === deleteingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', location: '', phonenumber: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const updateData = (newData: Item, id: React.Key) => {
        fetch(`https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newData)
        }).then(res => {
            if (res.ok) {
                console.log("success")
                return res.json();
            }
            console.log("error" + res)
        })
            .catch(error => {
                console.log("error" + error)
            })
    }

    const save = async (key: React.Key) => {
        //key is the id of selecred row
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            //index is array index of selected row
            if (index > -1) {
                //item is the row we need to edit
                const item = newData[index];
                console.log(row)
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                //After above line new Data iist just theline that hass been edited
                updateData(row, key)
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const deleteAPI = (record: string | number) => {
        fetch(`https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity/${record}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.ok;
            }
        })
            .catch(error => {
                console.log(error)
            })
    }


    const deleteRow = async (record: string | number) => {
        try {
            const newData = [...data];
            const updatedData = newData.filter(item => item.key !== record);
            deleteAPI(record)
            setData(updatedData);
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState<Item>();
    const viewModal = (data: Item) => {
        setSelectedData(data);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    
    const columns = [
        {
            title: 'Id',
            dataIndex: 'key',
            width: '10%',
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'username',
            width: '30%',
            editable: true,
            render: (username: string, record: Item) => (
                <Typography.Link style={{ marginRight: 8 }} onClick={() => {
                    viewModal(record)
                    setModalVisible(true)
                }}>
                    {username}
                </Typography.Link>
            ),
        }

        ,
        {
            title: 'Location',
            dataIndex: 'city',
            width: '30%',
            editable: true,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            width: '18%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            width: '10%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                const deleteable = isDeleting(record)
                return editable || deleteable ? (

                    editable ? (
                        <span>
                            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                                <CheckOutlined style={{ fontSize: 20 }} />
                            </Typography.Link>

                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <CloseOutlined style={{ fontSize: 20 }} />
                            </Popconfirm>
                        </span>) : (
                        <div style={{ display: 'flex', flexDirection: 'column', color: 'red' }}>
                            <div>
                                DELETE?</div>
                            <div>
                                <Typography.Link onClick={() => {
                                    deleteRow(record.key)
                                    setDeleteingKey('')
                                }}>
                                    <CheckOutlined style={{ fontSize: 20 }} />
                                </Typography.Link>
                                ‎ ‎ ‎‎ ‎ ‎
                                <Typography.Link onClick={() => {
                                    setDeleteingKey('')
                                }}>
                                    <CloseOutlined style={{ fontSize: 20 }} />
                                </Typography.Link>
                            </div>
                        </div>

                    )
                ) : (
                    <>
                        <Popconfirm  title="" icon="" okText={"Delete"} cancelText={"Edit"} onConfirm={() => { setDeleteingKey(record.key) }} onCancel={() => { edit(record) }}>
                            <a>Action</a>
                        </Popconfirm>
                    </>


                );
            },
        },

    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (<>
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
        <DataViewModal visible={modalVisible} onClose={closeModal} selectedData={selectedData} />

    </>
    )
}

export default DataTable	