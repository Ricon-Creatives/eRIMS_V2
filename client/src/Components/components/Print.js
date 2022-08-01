import React,{useState,useEffect} from 'react'
import moment from 'moment';
import { useHistory ,useLocation} from 'react-router-dom';

const Print = () => {
    const [today, setToday] = useState("");
    const [payee, setPayee] = useState("");
    const [billed, setBilled] = useState(0.00);
    const [balance, setBalance] = useState(0.00);
    const [receipt_no, setReciept] = useState();



    const location = useLocation();
     console.log(location.state);
    

    const openPrint = () => {
        var divContents = document.getElementById(`receipt`).innerHTML;
        var prnt = window.open('', '', 'height=400, width=300');
         prnt .document.write(divContents);
        prnt .document.close();
        prnt .print();
       // history.push("/payment-table")
     }
     const getBilled = (value) => {
      let bilingAmount = value
      setBilled(bilingAmount)
       getBalance()
     }

     const getBalance = () => {
       let bal =  billed - payee.amount
       //console.log(billed)
       setBalance(bal.toFixed(2))
     }

     const getReciptNo = (str) => {
      if (payee?.length !== 0) {
      let rec_no = str.split("-").shift().toUpperCase()
       console.log(rec_no)
       setReciept(rec_no)

      }
     }
     useEffect(() =>{
        const todayDate = new Date().toDateString();
        setToday(todayDate);
        setPayee(location.state)
       getReciptNo(payee.reference_no)
      }, [billed,payee])

  return (
    <div className='container'>
    <button type="button" className="btn btn-classic btn-sm my-4 me-5 align-self-end" onClick={openPrint}
    style={{ width:'10%' }}>Print</button>
  <div className="row justify-content-center align-middle py-5" id='receipt' 
        style={{ justifyContent:'center',verticalAlign:'middle',padding:6 }}>
    <div className="col-sm-9 col-sm-offset-2">
    <div className='row align-middle'>
            <div className="col-5" style={{ float:'left' }}>
            <p className="widget-title grey lighter">
                   Receipt No. #{ receipt_no }
             </p>

                <h4 className="widget-title grey lighter">
                    Krachi Nchumuru District Assembly
                </h4>
                    <span style={{ marginRight:5 }}>Date: </span>
                    <span className="blue">{payee.date}</span>
      </div>

      <div className="col-2"></div>

                <div className="col-5 justify-content-end text-end" style={{ float:'right' }}>
                <div className=''>
                                <ul className="list-unstyled" style={{ listStyle:'none'}}>
              <li style={{display:'flex', justifyContent:'space-between'}}>
              <span style={{ marginRight:10 }}>Customer Name: </span>
              <span>{payee.payee_name}</span>
                                    </li>
                                 {/*   <li style={{display:'flex', justifyContent:'space-between'}}>
                <span style={{ marginRight:10 }}>Customer Code:</span>
                  <span>56656</span>
                                    </li>
                                    <li style={{display:'flex', justifyContent:'space-between'}}>
                                        <span style={{ marginRight:10 }}>Location</span>
                  <span>Mike Free</span>
                                    </li>
                                    <li style={{display:'flex', justifyContent:'space-between'}}>
                <span style={{ marginRight:10 }}>Business Type</span>
                <span>Mike Free</span>
  </li>*/}
                                </ul>
                            </div>
                </div>
      
            </div>
            <div style={{ justifyContent:'center',verticalAlign:'middle',paddingBottom:6,clear:'both' }}>
      <h6 style={{textAlign:'center',fontWeight:'bold', marginBottom:20,borderBottomColor:'black',borderBottomWidth: 1,
    borderBottomStyle:'dashed',padding:2,fontSize:16}}>
        Offcial Payment Receipt
      </h6>

                <div className="form-inline" style={{ display:'flex',flexFlow:'nowrap',alignItems:"center",
      clear:'both',display:'block',margin:5}}>
        <label style={{ marginRight:5 ,width:'20%'}}>For Payment Of: </label>
        <input type="text" name="payment_type" placeholder="Payment Type.."
        style={{ width:'50%',resize:'vertical',boxSizing:'border-box', border:'none',borderBottomWidth: 1,
        borderBottomColor:'black',padding:4, borderBottomStyle:'dashed',backgroundColor:'unset'}} 
        value={payee.reason}/>
      </div>
   

      <div className="form-inline" style={{ display:'flex',flexFlow:'nowrap',alignItems:"center",
      clear:'both',display:'block',marginTop:20}}>
        <label style={{ marginRight:5 ,width:'20%'}}>
          Amount Billed: 
          </label>
          GHC
        <input type="number" name="billed"
        style={{ width:'20%',resize:'vertical',boxSizing:'border-box', border:'none',borderBottomWidth: 1,
        borderBottomColor:'black',padding:4, borderBottomStyle:'dashed',backgroundColor:'unset'}}
         value={billed} onChange={e => getBilled(e.target.value)} step="any" placeholder='0.00'/>
        
         <label style={{ marginRight:3 ,marginLeft:10, width:'15%'}}>
          Amount Paid:
           </label>
           GHC
        <input type="number" name="paid"
        style={{ width:'20%',resize:'vertical',boxSizing:'border-box', border:'none', borderBottomWidth: 1,
        borderBottomColor:'black',padding:4,borderBottomStyle:'dashed',backgroundColor:'unset'}} 
        value={payee.amount}/>
        
      </div>

      <div className="form-inline" style={{ display:'flex',flexFlow:'nowrap',alignItems:"center",
      clear:'both',display:'block',marginTop:20}}>
        <label  style={{ marginRight:10 ,width:'20%'}}>Balance: </label>
        GHC
        <input type="number" name="balance"
        style={{ width:'20%',resize:'vertical',boxSizing:'border-box', border:'none',borderBottomWidth: 1,
        borderBottomColor:'black',padding:4,borderBottomStyle:'dashed',backgroundColor:'unset'}} 
        value={balance} placeholder="0.00"/>
    
      </div>


            </div>
    </div>
</div>
</div>

  )
}

export default Print