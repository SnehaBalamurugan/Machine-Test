import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import AddEditUser from './AddEditUser';
import { EditOutlined } from '@ant-design/icons';


const MainPage = () => {

    const [addComponent, setAddComponent] = useState(false)
    const [dataSource, setDataSource] = useState()
    const [rowValue, setRowValue] = useState()
    const [flag, setFlag] = useState('Add')

    //Table Columns

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName)
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'Edit Details',
            dataIndex: false,
            align: 'center',
            render: (text, record) => {
                return <EditOutlined style={{ fontSize: '20px' }} onClick={() => {
                    setAddComponent(true)
                    setRowValue(record)
                    setFlag('Edit')
                }} />
            }
        }

    ];

    //Fetch and set data for table from LocalStorage

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('tableData')) && JSON.parse(localStorage.getItem('tableData')).length > 0) {
            setDataSource(JSON.parse(localStorage.getItem('tableData')))
        }
        else {
            setDataSource([])
        }
    }, [localStorage.getItem('tableData')])

    return (
        <Fragment>
            <div className="col-md-12 m-3">
                <div className="row">
                    <div className="col-md-6">
                        <h5>{addComponent === false ? "User Details" : `${flag} User Details`}</h5>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Button type='primary' onClick={() => {
                            setAddComponent(!addComponent)
                            setFlag('Add')
                        }}>{addComponent === false ? `Add User Information` : 'Back'}</Button>
                    </div>
                </div>
            </div>
            {addComponent === true ? <AddEditUser rowValue={rowValue} flag={flag} /> :
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            }

        </Fragment>
    );
};

export default MainPage;
