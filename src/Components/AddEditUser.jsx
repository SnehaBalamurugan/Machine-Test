import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const AddEditUser = ({
    rowValue,
    flag,
}) => {

    //State for table data

    const [tempArray, setTempArray] = useState([])

    //State to set values in onChange Event
    const [userDetailsArray, setUserDetailsArray] = useState({
        id: Math.random().toString(36).substr(2, 9),
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        postal: '',
        address: ''
    })

    //Fetching data from local Storage

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('tableData')) && JSON.parse(localStorage.getItem('tableData')).length > 0) {
            setTempArray(JSON.parse(localStorage.getItem('tableData')))
        }
        else {
            setTempArray([])
        }

    }, [localStorage.getItem('tableData')])

    //To set value in input field,if edit is chosen

    useEffect(() => {
        if (flag === 'Edit' && rowValue) {
            setUserDetailsArray({
                ...userDetailsArray,
                id: rowValue.id,
                firstName: rowValue.firstName,
                lastName: rowValue.lastName,
                email: rowValue.email,
                phone: rowValue.phone,
                city: rowValue.city,
                state: rowValue.state,
                country: rowValue.country,
                postal: rowValue.postal,
                address: rowValue.address
            })
        }
        else {
            setUserDetailsArray({
                ...userDetailsArray,
                id: Math.random().toString(36).substr(2, 9),
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                city: '',
                state: '',
                country: '',
                postal: '',
                address: ''
            })
        }
    }, [rowValue, flag])

    // Add/Edit onChange Event

    const addEditUserDetails = (event) => {
        setUserDetailsArray({
            ...userDetailsArray,
            [event.target.name]: event.target.value
        })
    }

    // Submit Event

    const onSubmit = (event) => {
        event.preventDefault()
        if (flag === 'Edit') {
            const idToRemove = rowValue.id; // ID of the element to remove
            const index = tempArray.findIndex((element) => element.id === idToRemove);
            tempArray.splice(index, 1, {
                id: rowValue.id,
                firstName: userDetailsArray.firstName,
                lastName: userDetailsArray.lastName,
                email: userDetailsArray.email,
                phone: userDetailsArray.phone,
                city: userDetailsArray.city,
                state: userDetailsArray.state,
                country: userDetailsArray.country,
                postal: userDetailsArray.postal,
                address: userDetailsArray.address
            })
            localStorage.setItem('tableData', JSON.stringify(tempArray));
            window.location.href='/main-page'

        }
        else {
            tempArray.push(userDetailsArray)
            localStorage.setItem('tableData', JSON.stringify(tempArray));
            window.location.href='/main-page'
        }
    }

    return (
        <Fragment>
            <Card>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">First Name</label>
                            <Input placeholder="Abc" name='firstName' value={userDetailsArray.firstName} onChange={(e) => { addEditUserDetails(e) }} suffix={<UserOutlined />} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Last Name</label>
                            <Input placeholder="Efg" name='lastName' value={userDetailsArray.lastName} onChange={(e) => { addEditUserDetails(e) }} suffix={<UserOutlined />} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">Email Id</label>
                            <Input placeholder="abc@gmail.com" name='email' value={userDetailsArray.email} onChange={(e) => { addEditUserDetails(e) }} suffix={<MailOutlined />} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Phone Number</label>
                            <Input placeholder="9876543210" name='phone' value={userDetailsArray.phone} onChange={(e) => { addEditUserDetails(e) }} suffix={<PhoneOutlined />} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">City</label>
                            <Input placeholder="Coimbatore" name='city' value={userDetailsArray.city} onChange={(e) => { addEditUserDetails(e) }} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">State</label>
                            <Input placeholder="Tamil Nadu" name='state' value={userDetailsArray.state} onChange={(e) => { addEditUserDetails(e) }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">Country</label>
                            <Input placeholder="India" name='country' value={userDetailsArray.country} onChange={(e) => { addEditUserDetails(e) }} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Postal Code</label>
                            <Input placeholder="641001" name='postal' value={userDetailsArray.postal} onChange={(e) => { addEditUserDetails(e) }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <label htmlFor="">Address</label>
                    <TextArea placeholder='Address' name='address' value={userDetailsArray.address} onChange={(e) => { addEditUserDetails(e) }} />
                </div>
                <div className='text-center mt-3'>
                    <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={(e) => { onSubmit(e) }}>Submit</Button>
                </div>
            </Card>
        </Fragment>
    )

}

export default AddEditUser;