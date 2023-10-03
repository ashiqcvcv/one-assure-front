import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SelectInsurancePlan.css';
const baseUrl = 'http://127.0.0.1:5000/';

export default function SelectInsurancePlan() {
    const navigate = useNavigate();
    const [client_type, setClient_type] = useState([]);
    const [city_type, setCity_type] = useState([]);
    const [tenure_type, setTenure_type] = useState([]);
    const [age_category, setAge_category] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [year_category, setYear_category] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [selectedTenure, setSelectedTenure] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        fetch(baseUrl + '/get-loading-params')
            .then(response => response.json())
            .then(json => {
                if (json.client_type) setClient_type(json.client_type);
                if (json.city_type) setCity_type(json.city_type);
                if (json.tenure_type) setTenure_type(json.tenure_type);
                if (json.age_category) setAge_category(json.age_category);
                if (json.year_category) setYear_category(json.year_category);
                console.log(json)
            })
            .catch(error => console.error(error));
    }, [])
    function addSelectedUser(type) {
        let clientToAdd = client_type.find(client => client.value === type);
        if (!clientToAdd) return;
        if (clientToAdd.max === clientToAdd.count) return;
        let newSelectedClient = [...selectedClient];
        newSelectedClient.push({
            age: '',
            label: clientToAdd.label + ' ' + ((clientToAdd.count || 0) + 1),
            value: type
        })
        setSelectedClient(newSelectedClient);
        let newclient_type = [...client_type];
        newclient_type.some(client => {
            if (client.value === type) {
                if (!client.count) client.count = 0;
                client.count += 1;
                return true;
            }
            return false;
        })
        setClient_type(newclient_type);
    }
    function removeSelectedUser(type) {
        let clientToAdd = client_type.find(client => client.value === type);
        if (!clientToAdd) return;
        if (!clientToAdd.count) return;
        let newSelectedClient = [...selectedClient];
        let stack = [];
        while (newSelectedClient.length) {
            let lastValue = newSelectedClient.pop();
            if (lastValue.value === type) break;
            stack.push(lastValue);
        }
        while (stack.length) {
            newSelectedClient.push(stack.pop())
        }
        setSelectedClient(newSelectedClient);
        let newclient_type = [...client_type];
        newclient_type.some(client => {
            if (client.value === type) {
                if (!client.count) client.count = 0;
                client.count -= 1;
                return true;
            }
            return false;
        })
        setClient_type(newclient_type);
    }

    function updateAge(value, clientupdate) {
        let newSelectedClient = [...selectedClient];
        newSelectedClient.some(client => {
            if (client.label === clientupdate.label) {
                client.age = parseInt(value);
                return true;
            }
            return false;
        })
    }

    function viewPlan() {
        if (!selectedClient.length) {
            setError('No members are selected.')
            return;
        }
        if (!selectedCity) {
            setError('No city selected.')
            return;
        }
        if (!selectedTenure) {
            setError('No tenure selected.')
            return;
        }
        let length = selectedClient.length;
        for (let i = 0; i < length; i++) {
            if (!selectedClient[i].age) {
                setError(`for member ${selectedClient[i].label} age is not selected.`)
                return;
            }
        }
        fetchPlan();
    }
    function fetchPlan() {
        let body = {
            city: selectedCity,
            tenure: selectedTenure,
            year: selectedYear,
            clients: selectedClient.map(client => {
                return { age: parseInt(client.age), type: client.value, label: client.label }
            })
        };
        fetch(baseUrl + '/get-plan', {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(json => {
                navigate('/view-plan-detail', { state: { clients: json, year: selectedYear, tenure_amount: selectedTenure, city: selectedCity } });
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='container-fluid'>
            <Error error={error} />
            <div className='d-flex align-items-center align-self-center p-2'>
                <div className='outer-card'>
                    <div className='inner-card row'>
                        <div className='left-card col-6'>
                            <div>
                                <div className='p-4'>
                                    <span>Select Member You Want to Insure</span>
                                </div>
                                <div className='row'>
                                    {
                                        client_type.map(client => {
                                            return (<div className='col-6' key={client.value} >
                                                <li className="select-member">
                                                    <input type="checkbox" id="self" name="profile" value="Self" />
                                                    <label data-id="self" className={client.value}>{client.label}</label>
                                                    <div className="addmore">
                                                        <span onClick={() => removeSelectedUser(client.value)} className="minus"></span>
                                                        <input type="text" value={client.count || 0} readOnly="" />
                                                        <span onClick={() => addSelectedUser(client.value)} className="plus"></span>
                                                    </div>
                                                </li>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div className='pt-3'>
                                <div className='p-4'>
                                    <span>Select city tier</span>
                                </div>
                                <div className='row'>
                                    {
                                        city_type.map(city => {
                                            return (<div key={city.value} onClick={() => setSelectedCity(city.value)} className='col-3'>
                                                <li className={`select-member ${city.value === selectedCity ? 'selected' : ''}`}>
                                                    <input type="checkbox" id="self" name="profile" className={city.value} />
                                                    <label data-id="self" className={city.value}>{city.label}</label>
                                                </li>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>

                            <div className='pt-3'>
                                <div className='p-4'>
                                    <span>Select Cover</span>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <select onChange={(e) => setSelectedTenure(e.target.value)} className="custom-select select-tenure">
                                            <option selected={!selectedTenure}>Select Cover</option>
                                            {tenure_type.map(tenure => {
                                                return (<option selected={selectedTenure === tenure.value ? true : false} value={tenure.value} key={tenure.value}>{tenure.label}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='pt-3'>
                                <div className='p-4'>
                                    <span>Select tenure</span>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <select onChange={(e) => setSelectedYear(e.target.value)} className="custom-select select-tenure">
                                            <option selected={!selectedYear}>Select Tenure</option>
                                            {year_category.map(year => {
                                                return (<option selected={selectedYear === year.value ? true : false} value={year.value} key={year.value}>{year.label}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-card col-5'>
                            <div className='selected-candidates pt-2'>
                                {
                                    selectedClient.map((client, index) => {
                                        return (<div className='selected-card' key={index + client.value}>
                                            <label className='p-3 d-flex align-items-center align-self-center'>
                                                <i className={`${client.value}-img px-2`}></i>
                                                <h6>{client.label}</h6>
                                                <div className='px-4'>
                                                    <select onChange={(e) => updateAge(e.target.value, client)} className="custom-select select-age">
                                                        <option selected={!client.age ? 'selected' : ''}>Select Age</option>
                                                        {
                                                            age_category.map(age => {
                                                                return (<option selected={client.age === age.value ? true : false} key={age.value} value={age.value}>{age.label}</option>)
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </label>
                                        </div>)
                                    })
                                }
                            </div>
                            <div className='d-flex justify-content-end pt-4 pb-3'>
                                <button type="button" onClick={() => viewPlan()} className="btn btn-danger">View Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Error({ error }) {
    const [message, setMessage] = useState();
    const [isShow, setIsShow] = useState(false);
    const [initial, setInitial] = useState(true);
    useEffect(() => {
        if (initial) {
            setInitial(false);
            return;
        }
        setIsShow(true);
        setMessage(error);
        setTimeout(() => {
            setIsShow(false);
        }, 5000);
    }, [error])

    return isShow && (<div class="alert alert-primary" role="alert">
        {message}
    </div>)
}