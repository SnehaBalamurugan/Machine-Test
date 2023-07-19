import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Input, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Toast } from 'bootstrap';

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

    const [prevEmail, setPrevEmail] = useState([])

    //Regex validations

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z]+$/;

    //Fetching data from local Storage

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('tableData')) && JSON.parse(localStorage.getItem('tableData')).length > 0) {
            setTempArray(JSON.parse(localStorage.getItem('tableData')))
        }
        else {
            setTempArray([])
        }

    }, [localStorage.getItem('tableData')])


    //To store previous emails in an array

    useEffect(() => {
        if (tempArray && tempArray.length > 0) {
            const emailIds = tempArray.map((item) => item.email);
            setPrevEmail(emailIds)
        }
    }, [tempArray])

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

    console.log(userDetailsArray, 'userDetailsArray');

    const getInputValiditySymbol = (isValid) => {
        return isValid ? '✓' : '✕';
    };

    // Submit Event

    const onSubmit = (event) => {
        event.preventDefault();

        //Check Validations

        const isValidFirstname = nameRegex.test(userDetailsArray.firstName);
        const isValidLastname = nameRegex.test(userDetailsArray.lastName);
        const isValidEmail = emailRegex.test(userDetailsArray.email);
        const isValidPhone = phoneRegex.test(userDetailsArray.phone);


        if (flag === 'Edit') {
            if (isValidFirstname && isValidLastname && isValidEmail && isValidPhone) {
                if (prevEmail.includes(userDetailsArray.email)) {
                    message.error('Email Id Already Exists !')
                }
                else {
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
                    window.location.href = '/main-page'
                }
            }
            else {
                message.error('Please enter valid input!')
            }
        }
        else {
            if (isValidFirstname && isValidLastname && isValidEmail && isValidPhone) {
                if (prevEmail.includes(userDetailsArray.email)) {
                    message.error('Email Id Already Exists !')
                }
                else {
                    tempArray.push(userDetailsArray)
                    localStorage.setItem('tableData', JSON.stringify(tempArray));
                    window.location.href = '/main-page'
                }
            }
            else {
                message.error('Please enter valid input!')
            }
        }
    }

    return (
        <Fragment>
            <Card>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">First Name</label>
                            <Input placeholder="Abc" name='firstName'
                                style={{
                                    border: '1px solid',
                                    borderColor: isValidFirstname ? 'green' : 'red',
                                    padding: '5px',
                                }}
                                value={userDetailsArray.firstName} onChange={(e) => { addEditUserDetails(e) }} suffix={<UserOutlined />} />
                            <span style={{ color: isValidFirstname ? 'green' : 'red' }}>{getInputValiditySymbol(isValidFirstname)}</span>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Last Name</label>
                            <Input placeholder="Efg" name='lastName'
                                style={{
                                    border: '1px solid',
                                    borderColor: isValidLastname ? 'green' : 'red',
                                    padding: '5px',
                                }}
                                value={userDetailsArray.lastName} onChange={(e) => { addEditUserDetails(e) }} suffix={<UserOutlined />} />
                            <span style={{ color: isValidLastname ? 'green' : 'red' }}>{getInputValiditySymbol(isValidLastname)}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="">Email Id</label>
                            <Input placeholder="abc@gmail.com" name='email'
                                style={{
                                    border: '1px solid',
                                    borderColor: isValidEmail ? 'green' : 'red',
                                    padding: '5px',
                                }}
                                value={userDetailsArray.email} onChange={(e) => { addEditUserDetails(e) }} suffix={<MailOutlined />} />
                            <span style={{ color: isValidEmail ? 'green' : 'red' }}>{getInputValiditySymbol(isValidEmail)}</span>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Phone Number</label>
                            <Input placeholder="9876543210" name='phone'
                                style={{
                                    border: '1px solid',
                                    borderColor: isValidPhone ? 'green' : 'red',
                                    padding: '5px',
                                }}
                                value={userDetailsArray.phone} onChange={(e) => { addEditUserDetails(e) }} suffix={<PhoneOutlined />} />
                            <span style={{ color: isValidPhone ? 'green' : 'red' }}>{getInputValiditySymbol(isValidPhone)}</span>
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