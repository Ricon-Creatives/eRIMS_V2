import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import moment, { duration } from 'moment';


const PaymentsTable = () => {
    const [payments, setPayments] = useState([
        {
            amount: "89",
            collector: "Francis Chidi",
            date: "2021-11-01",
            email: "",
            payee_name: "Gifty Ansah",
            payment_type: "momo",
            reason: "property-tax",
            reference_no: "9a611460-3a9e-11ec-bf6f-91384452495f",
            remark: "pending-payment",
            tel_no: 244657849,
            time: "07:02:21 am",
            transaction_id: 44
        },
        {
            amount: "70",
            collector: "Francis Chidi",
            date: "2021-11-01",
            email: "",
            payee_name: "Kofi Oklu",
            payment_type: "momo",
            reason: "sewage-fee",
            reference_no: "817f3300-3aa3-11ec-b7d1-a1bc5b6ddc0e",
            remark: "pending-payment",
            tel_no: 244589768,
            time: "07:37:26 am",
            transaction_id: 45
        },
        {
            amount: "25",
            collector: "Francis Chidi",
            date: "2021-11-03",
            email: "",
            payee_name: "Jesse Obeng",
            payment_type: "momo",
            reason: "value-added-tax",
            reference_no: "e1c1dec0-3b34-11ec-a72d-b95b3c6b00b0",
            remark: "pending-payment",
            tel_no: 277184576,
            time: "04:58:05 pm",
            transaction_id: 46
        },
        {
            amount: "20",
            collector: "Francis Chidi",
            date: "2021-11-05",
            email: "",
            payee_name: "Helen Cooks",
            payment_type: "momo",
            reason: "sewage-fee",
            reference_no: "bdc802f0-3b35-11ec-961a-e3387ce9aed6",
            remark: "pending-payment",
            tel_no: 507683240,
            time: "05:04:14 pm",
            transaction_id: 47
        },
        {
            amount: "25",
            collector: "Francis Chidi",
            date: "2021-10-05",
            email: "",
            payee_name: "Helen Cooks",
            payment_type: "momo",
            reason: "sewage-fee",
            reference_no: "ghbdc802f0-3b35-11ec-961a-e3387ce9aed6",
            remark: "pending-payment",
            tel_no: 5076832407,
            time: "05:04:14 pm",
            transaction_id: 47
        }
    ]	);
    const [data, setData] = useState([]);
    const [curVal, setCurVal] = useState('');
    const [search, setSearch] = useState('');
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
                setData(payments)
            }
        })

    }
    const setDate = () =>{
        let thisMonth = new Date().getMonth() + 1; //months from 1-12
        let year = new Date().getFullYear();

        let month = year + "-" + thisMonth

        //const month = moment().format("YYYY-MM");//2021/10
        let  date = new Date(month)
        let from = new Date(month).toLocaleDateString()
        let to = new Date(date.getFullYear(),date.getMonth() +1, 0).toLocaleDateString()
        const range = {
            from,
            to
        }
        console.log(month);
        console.log(range);
    }

    const getMonthRevenue = () =>{
        
        if (curVal == "today") {
        let  today = new Date().toLocaleDateString()
        let arr = payments.filter((item) => {
            const itemDate = new Date(item.date).toLocaleDateString()
            return itemDate ==  today;
        })
            setData(arr)
            console.log(arr)
            
        }else if (curVal =='this-month'){
                let thisMonth = new Date().getMonth() + 1;
                let year = new Date().getFullYear();
        
                let month = year + "-" + thisMonth
        
                let  date = new Date(month)
                let from = new Date(month)
                let to = new Date(date.getFullYear(),date.getMonth() +1, 0)
        
                let arr = payments.filter((item) => {
                    const itemDate = new Date(item.date)
                    return from <= itemDate && itemDate <= to;
                 })
                 setData(arr)
                 console.log(arr)
            }
            else if (curVal == "this-year") {
                let year = new Date().getFullYear();
                let from = new Date(year, 0, 1)
                let to = new Date(year, 11, 31)
                 console.log(from)
                console.log(to)
                let arr = payments.filter((item) => {
                    const itemDate = new Date(item.date)
                    return from <= itemDate && itemDate <= to;
                 })
                 setData(arr)
                 console.log(arr)
                 
            }
    }
    

    const FilterData = (e) => {
        e.preventDefault();
        let arrData = payments
        
        let arr = payments.filter((item) => {
            if (search == item.amount || search ==  item.payee_name || search == item.tel_no ||search ==  item.payment_type || 
                search == item.reason || search == item.remark){
                    return item
                } 
            })
            console.log(arr)
            setData(arr)
            if (search =="") setData(arrData)
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
                    <button className="btn btn-classic" onClick={proceed}>
                        Add New Payment
                    </button>
                </div>

                <div className="col-sm-6 ">
                <form className="float-right form-inline mt-2 ml-2">
                    <div className="form-group">
                      <input type="text" className="myInput form-control" value={search} onChange = {e => setSearch(e.target.value)} 
                      placeholder="Search" />
                    </div>
                    <button type="button" className="btn btn-sm btn-primary" onClick={FilterData}>
                       
                    Search</button>
                  </form>
                </div>

            </div>


            <div className="row">
                <div className="col-sm-2">
                    <select className="form-select form-select-sm" aria-label="Default select example">
                    <option disabled>Bulk Action</option>
                        <option value="1">Rename</option>
                        <option value="2">Delete</option>
                        <option value="3">Select</option>
                    </select>
                </div>

                <div className="col-sm-2 mr-0">
                    <select className="form-select form-select-sm" value={curVal} onChange ={e => setCurVal(e.target.value)}>
                    <option>Date Range</option>
                        <option value="today">Today</option>
                        <option value="this-month">This Month</option>
                        <option value="this-year">This Year</option>
                    </select>
                </div>
                <div className="col-sm-2 ml-0  pl-0">
                    <button type="button" className="btn btn-classic" onClick={getMonthRevenue}>Select</button>
                </div>

            </div>




            <table className="table table-bordered">
                <thead className="table-dark">
                    <th>-</th>
                    <th>FULL NAME</th>
                    <th>AMOUNT</th>
                    <th>TELEPHONE</th>
                    <th>PAYMENT TYPE</th>
                    <th>TAX TYPE</th> 
                    <th>STATUS</th>
                    <th>DATE</th>
                </thead>
                <tbody>
                    {data.map((payment) => (
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
                            <td>{payment.date}</td>
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

export default PaymentsTable
