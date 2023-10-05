import React from 'react'
import './ViewPlanDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_API_URL;

export default function ViewPlanDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    function checkOut() {
        fetch(baseUrl + '/checkout', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location.state && location.state)
        })
            .then(response => response.json())
            .then(json => {
                navigate('/one-assure-front/checkout', { state: json });
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='container-fluid'>
            <div className='d-flex align-items-center align-self-center p-4'>
                <div className='outer-card'>
                    <div className='inner-card row'>
                        <div class="event-schedule-area-two bg-color pad100">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="section-title text-center">
                                            <div class="title-text">
                                                <h2>Plan Details</h2>
                                                <p>{`Total ${((location.state && location.state.clients) || []).reduce((acc, curr) => acc + curr['base-rate'], 0)} for ${(location.state && location.state.year) || 0} years`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="table-property">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Sl No</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Age</th>
                                                        <th scope="col">Base Rate</th>
                                                        <th scope="col">Floater Discount</th>
                                                        <th scope="col">Discounted Rate</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        ((location.state && location.state.clients) || []).map((client, index) => {
                                                            return (<tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td className='d-flex align-items-center align-self-center'>
                                                                    <i className="adult-img px-2"></i>{client.label}</td>
                                                                <td>{client.age}</td>
                                                                <td>{client['base-rate']}</td>
                                                                <td>{client['floater-discount']}%</td>
                                                                <td>{client['discounted-rate']}</td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="primary-btn text-center">
                                            <input onClick={() => checkOut()} class="btn btn-primary" value={"CheckOut"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
