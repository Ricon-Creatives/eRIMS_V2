import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';


const PayeeTable = () => {
    const [payees, setPayees] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const agent = JSON.parse(localStorage.getItem('agent'));
    const {id, name, phone, level, see} = agent;
    const history = useHistory(); 


    const searchData = (e) =>{
        if(e.target.value === ''){
            setSearch('')
            setData(payees)
        }else{
            setSearch(e.target.value)
        }
    }

    const payeeLoadout = () =>{
        console.log(id);
        const agent_id = Number(id);
        console.log(agent_id);

        const options={ 
            
            params:{
                agent_id
            },

            headers:{
                'x-auth-token':token
              }
        }

        if(level === 'SuperUser'){
            axios.get('api/payee/', options)
            .then(res =>{
                if(!res){
                    alert('there was a problem with your request')
                }else{
                    const clients = res.data;
                    console.log(clients);
                    const count = clients.length;
                    console.log(count);
                    setPayees(clients);
                    setData(clients)
                }
            })
        }else{
            axios.get('api/payee/for', options)
            .then(res =>{
                if(!res){
                    alert('there was a problem with your request')
                }else{
                    const clients = res.data;
                    console.log(clients);
                    const count = clients.length;
                    console.log(count);
                    setPayees(clients);
                    setData(clients)
                }
            })
        }
        
    }

    const FilterData = (e) => {
        e.preventDefault();
        let arrData = payees
        
        let arr = payees.filter((item) => {
            if (search == item.full_name || search ==  item.tel || search == item.tel_no ||search ==  item.location || 
                search == item.last_payment_date){
                    return item
                } 
            })
            console.log(arr)
            setData(arr)
            if (search =="") setData(arrData)
  }


    useEffect(()=>{
        payeeLoadout()
    },[])

    const proceed = () =>{
        history.push('/payee-register')
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col-sm-6">
                    <button className="btn btn-classic" onClick={proceed}>
                        Add New Payee
                    </button>
                </div>

                <div className="col-sm-3"></div>

                <div className="col-sm-3">
                <form className="form-inline mt-2 ml-2 float-right">
                    <div className="form-group">
                      <input className="myInput form-control" type="text" placeholder="Search" value={search} 
                        onChange = {e => searchData(e)}/>
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={FilterData}>
                       
                    Search</button>
                  </form>
                </div>

            </div>


            <div className="row">
                <div className="col-sm-2">
                    <select className="form-select" aria-label="Default select example">
                    <option selected disabled>Bulk Action</option>
                        <option value="1">Rename</option>
                        <option value="2">Delete</option>
                        <option value="3">Select</option>
                    </select>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-sm btn-primary">Apply</button>
                </div>
            </div>




            <table className="table table-bordered">
                <thead className="table-dark thead-dark">
                    <th></th>
                    <th>FULL NAME</th>
                    <th>TELEPHONE NUMBER</th>
                    <th>LOCATION</th>
                    <th>LAST PAYMENT DATE</th> 
                </thead>
                <tbody>
                    {data.map((payee) => (
                        <tr className="">
                            <td className="">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </td>
                            <td>{payee.full_name}</td>
                            <td>{payee.tel}</td>
                            <td>{payee.location}</td>
                            <td>{payee.last_payment_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example ">
            <ul className="pagination text-center justify-content-center">
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">6</a></li>
                <li className="page-item"><a className="page-link" href="#">7</a></li>
                <li className="page-item"><a className="page-link" href="#">8</a></li>
                <li className="page-item"><a className="page-link" href="#">9</a></li>
                <li className="page-item"><a className="page-link" href="#">10</a></li>
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>
  
        </div>
    )
}

export default PayeeTable
