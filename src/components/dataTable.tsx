import React, { useState} from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';


interface DataTableProps {
    data1: any[]; 
  }

const DataTable : React.FC<DataTableProps> = ({ data1 }) => {

  interface Item {
    key: string;
    name?: string;
    avatar?:string;
    category?:string;
    city?:string;
    country?:string;
    createdAt?:string;
    donationlink?:string;
    email?:string;
    intro?:string;
    password?:string;
    phonenumber?:number;
    username?:string;
    website?:string;
    location?:string
  }
  
  
  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' |'string';
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

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', location: '', phonenumber: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const updateData=(newData:Item,id:any)=>{
    console.log(JSON.stringify(newData))
    
fetch(`https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity/${id}`, {
    method: 'PUT', 
    headers: {'content-type':'application/json'},
    body: JSON.stringify(newData)
  }).then(res => {
    if (res.ok) {
        console.log("success")
        return res.json();
    }
    // handle error
    console.log("error"+res)
  }).then(task => {
    console.log("task"+task)
    // Do something with updated task
  }).catch(error => {
    console.log("error"+error)
    // handle error
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
        //After above line new Data iis just theline that hass been edited
        updateData(row,key)
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
    },
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
      title: 'Operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
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
    </>
  )
}

export default DataTable