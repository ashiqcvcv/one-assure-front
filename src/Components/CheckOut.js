import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckOut.css';

export default function CheckOut() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='container-fluid'>
            <div className='d-flex align-items-center align-self-center p-4'>
                <div className='outer-card'>
                    <div className='inner-card row'>
                        <h3>{`Policy number: ${location.state.policy_number}`}</h3>
                        <h3 className='pb-4'>{`You have successfully purchased the plan for ${location.state.year} on an amount of ${location.state.tenure_amount} for the city ${location.state.city}.`}</h3>
                        <div className='d-flex align-items-center align-self-center row'>
                            {
                                location.state.clients.map(client => {
                                    return (<div class="card col-3" >
                                    <img class="card-img-top" src={`./${client.value}.svg`} alt="child" width={90} height={90} />
                                    <div class="card-body">
                                        <h5 class="card-title">{client.label}</h5>
                                        <h5 class="card-title">{client.member_number}</h5>
                                        <p class="card-text">Age: {client.age}</p>
                                        <p class="card-text">Base Rate: {client['base-rate']}</p>
                                        <p class="card-text">Floater Discount: {'floater-discount'}%</p>
                                        <p class="btn btn-secondary">Discounted Price : {client['discounted-rate']}</p>
                                    </div>
                                </div>)
                                })
                            }
                        </div>
                        <button className='btn btn-primary' onClick={() => navigate('/')}>Back To Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
