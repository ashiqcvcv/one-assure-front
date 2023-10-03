import React, { Fragment } from 'react'
import './Header.css';


export default function Header() {
    return (
        <Fragment>
            <div className='d-flex flex-row-reverse'>
                <div className="p-2">Contact Us: 1800-300-300-300</div>
                <div className="p-2">Email: insurance@gmail.com</div>
            </div>
            <div className='bg-background d-flex align-items-center pl-4'>
                <div className='navbar-title'><h4 className='navbar-title'>Insurance Policy</h4></div>
            </div>
        </Fragment>
    )
}
