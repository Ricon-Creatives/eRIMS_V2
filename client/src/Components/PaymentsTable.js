import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import moment from 'moment';


const PaymentsTable = () => {
    const [payments, setPayments] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [thisMonth, setThisMonth] = useState({});
    const [thisYear, setThisYear] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const agent = JSON.parse(localStorage.getItem('agent'));
    const {id, name, phone, level, see} = agent;
    const history = useHistory(); 


    const paymentLoadout = () =>{
        const date = moment().format("YYYY-MM-DD");
        console.log(date);
        const options={
            params:{
                id,
                date
            },

            headers:{
                'x-auth-token':token
              }
        }
        axios.get('api/payments/daily', options)
        .then(res =>{
            
            if(!res){
                alert('there was a problem with your request')
            }else{
                const dailytrans = res.data;
                console.log(dailytrans);
                const count = dailytrans.length;
                console.log(count);
                setPayments(dailytrans)
            }
        })

    }

    const setDate = () =>{
        let thisMonth = new Date().getUTCMonth() + 1; //months from 1-12
        let year = new Date().getUTCFullYear();

        let month = year + "-" + thisMonth

        //const month = moment().format("YYYY-MM");//2021/10
        console.log(month);
        let  date = new Date(month)
        let from = new Date(month).toISOString()
        let to = new Date(date.getFullYear(),date.getMonth() +1, 0).toISOString()
        const range = {
            from,
            to
        }
        console.log(range);
    }


    const getMonthRevenue = () =>{


    }

   

    useEffect(()=>{
        paymentLoadout()
    },[])

    const proceed = () =>{
        history.push('/checkout')
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col-sm-6">
                    <button className="btn-classical" onClick={proceed}>
                        Add New Payment
                    </button>
                </div>

                <div className="col-sm-3"></div>

                <div className="col-sm-3">
                <form class="form-inline mt-2 ml-2">
                    <div class="form-group">
                      <input class="myInput form-control w-100" type="text" placeholder="Search" />
                    </div>
                    <button class="btn btn-sm btn-primary ml-2 mr-0 mb-md-0 mb-4 px-2">
                       
                    <i class="fas fa-search"></i></button>
                  </form>
                </div>

            </div>


            <div className="row">
                <div className="col-sm-2">
                    <select class="form-select" aria-label="Default select example">
                    <option selected disabled>Bulk Action</option>
                        <option value="1">Rename</option>
                        <option value="2">Delete</option>
                        <option value="3">Select</option>
                    </select>
                </div>

                <div className="col-sm-2">
                    <select class="form-select" aria-label="Default select example" onChange={setDate ()}>
                    <option selected disabled>Select Date Range</option>
                        <option value={currentDate}>Today</option>
                        <option value={thisMonth}>This Month</option>
                        <option value="3">This Year</option>
                    </select>
                </div>
            </div>




            <table className="table table-bordered">
                <thead className="table-dark">
                    <th></th>
                    <th>FULL NAME</th>
                    <th>AMOUNT</th>
                    <th>TELEPHONE</th>
                    <th>PAYMENT TYPE</th>
                    <th>TAX TYPE</th> 
                    <th>STATUS</th>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr className="">
                            <td className="">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </td>
                            <td>{payment.payee_name}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.tel_no}</td>
                            <td>{payment.payment_type}</td>
                            <td>{payment.reason}</td>
                            <td>{payment.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example ">
            <ul class="pagination text-center justify-content-center">
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">6</a></li>
                <li class="page-item"><a class="page-link" href="#">7</a></li>
                <li class="page-item"><a class="page-link" href="#">8</a></li>
                <li class="page-item"><a class="page-link" href="#">9</a></li>
                <li class="page-item"><a class="page-link" href="#">10</a></li>
                <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>
  
        </div>
    )
}

export default PaymentsTable
