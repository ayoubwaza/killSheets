import React,{useState} from 'react'
import { GoogleSpreadsheet } from "google-spreadsheet";
import { Button,TextField } from '@material-ui/core';
import {Link} from 'react-router-dom'
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

var GlobalStyle = createGlobalStyle`
  body{
    width:100%;
    height:100vh;
    background:linear-gradient(-45deg,#E5E7E9 50%,skyblue 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

var Container = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    height: 100vh;
`;
var Child = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 5px 5px 0 rgb(0,2,0);
    width: 500px;
    padding: 10px 0 10px 0;
    background: rgba(255,255,255,0.23);
    backdrop-filter: blur(50px);
    div{
      margin-bottom: 10px;
    }
`;
export default function App() {
  const [name,setName] = useState("");
  const [addresse,setAddresse] = useState("");
  const [city,setCity] = useState("");
  const [phone,setPhone] = useState("");
// Config variables
//const SPREADSHEET_ID = "1tyCH7261i3L4TPRL37FiWDXt_NwzrwX_-D2kClKWqkE";
//const SHEET_ID = "784493230";
//const CLIENT_EMAIL = "demo-562@coherent-glow-314811.iam.gserviceaccount.com";
//const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9K0q44+vf7ljK\nuGsQf/tZn9boPeN+cZIwiXrj50NXTRA57xwex/8uZI1Oaw6dhv5AAatovktgt7V/\nSscruNtq2xP12fvKnw/vzlLo6GNIJR9Bt7JQB11e0ymaTIqI2t3A20GXf9B2ZVFu\nOgs1pK4amxcIU7iJmNC92Ptojq1j09GBCLFT13Okj7+Qp2GMdpEgVrgQ6Ot2tvJg\nIftMmBNkL4ymuTKYcwM5mWqxLCTGM7Qmil8gzUfyNQrmQZ7022c5jwGgU/6n4pZH\nEk7eaPB+vSq+b5/UWbq93knXcLVGNISai07GNgjx9mY1nt5JdduvxbyzNvQ+03d3\nbIIH8SfRAgMBAAECggEAKVsHDW+ql/ycBcmWgndwRFI44fHxw6lhi+Hqb1uWMcZD\nt16qV6Jii8poyA2IlvC1sdmLly0O/ph7Adafv1O9CFnXvcZHkS8ABW2mW4u+dL3E\n3RGjVnKdu4bPkA+Os8ehdjGY392N/ew9hqsC21nixCdGvEfNTquNawu+Psf+aRW7\nVP/RYDotL5TtJqeLO+Y6P1c4MjnEpTgmqnxa5YOY7dunY73O1WLtDag+xqWpbrBH\nkZU2QJ4jHSvQaadFQw8jEW9/HQ/FwA9qdklC8OxnrnjR35retF2kogcGgTRsKO6d\nM/X2qbxG3Hhow3ikLcCiG2qK5PyxFeybz7UHN6/txwKBgQD3XnR12Ikg0g9ZNMZT\nYCAPFW/h3iTH13qBwrCJC0U6pvUoSCFfm0UwLUrM2cLdxyB+9HCLoCSvWMGIRrgg\nBSuShiWxDUqTWbFzE4uqPZv5YI8CTCoq23ufAG//Z/l5rUqJPTCD25UHWDIi82wS\nh0dqw4Ei07Z72ABYMGKrUHURgwKBgQDDxPwysJ9RzJgiCkhZylxiQ3sBFz3Wrwsy\nzt1sU06/O9io+XwlTVsX6Kogm8CBll3GMeGnKGu1J84EjIyiFczvZNiFzSLCTCk2\nd8/8b5Gf6qZUiU6yrJWDAy8C+CMq4nh3Oz3/H1uSDEaxalJ2vJ502lpXLmLoJ0G6\nattwBKBFGwKBgD34ObC0GFZSiWnNoMmOUTm2IxswbYJq5tPPFC6g1i0FWnFG8KVk\n3oZdMlnzS7AHjIqBbhhsfAQ5dfJP1RygbvP8C0E5lS8ozx2HDfwOBx8II4ttzTqD\nVYrVrzkKsSLcWMncvGSsA7+dRqIe3TofDbMfWyCAbTzFNgDhzjYgp9NFAoGBAJ4/\nbV3MR/znVVKu3S031tXXlmabUvFnLbY0YeherxkGV2y/vwqoLSp2eI9DV6lo0wSS\n7cUhd29IbdBfjI648J/S9POzjpVg2y+cShPUW/LYyvsqwuLLf1AYErhjvIm954L5\n8HN59ZtpMPvY5i/06GGs37n5VRo0IX1/Q0KZerRhAoGANcUpCALu0HK4xX8YnwdZ\n7sKTcj+d0EcYNfPrMdxQYbhBY533z59cc5pCJgBH9p0N/6ays5wEXFAjJR1Yrr4W\nNuHuPCprF80lzoSlsoj8G+tPjKxnXDQ7u1uJnsjVa8gfxFt2fMnnJ3IuPK/MpkRi\nbvJ3fN5M++f5yL5y71foK8c=\n-----END PRIVATE KEY-----\n";

//const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

/*const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};
const resetAll = () => {
  setName('');
  setAddresse('');
  setCity('');
  setPhone('')
}
*/
const dataSubmited = (e) => {
  e.preventDefault();
  //const newRow = { Name: name, Phone: phone,Addresse : addresse,City:city };
  //appendSpreadsheet(newRow)
  //.then(() => console.log({status : "success"},resetAll()))
  //.catch((err) => console.log(err));
  var data = {
    phone:phone,
    name:name,
    addresse:addresse,
    city:city
  }
  axios.post('http://localhost:8000/addUser',data)
}
  return (
    <Container>
      <Link to="/data">
        <h1>data</h1>
      </Link>
      <GlobalStyle/>
      <Child>
        <h2>React w/ googleSheet</h2>
        <div>
          <TextField id="outlined-basic" variant="outlined"  label="Name" type="text" value={name}  onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <TextField id="outlined-basic" variant="outlined"  label="Phone" type="text" value={phone}  onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div>
          <TextField id="outlined-basic" variant="outlined"  label="Addresse" type="text" value={addresse}  onChange={(e) => setAddresse(e.target.value)}/>
        </div>
        <div>
          <TextField id="outlined-basic" variant="outlined"  label="City" type="tel" value={city}  onChange={(e) => setCity(e.target.value)}/>
        </div>
        <Button color='primary' variant="contained" onClick={dataSubmited}>click me</Button>
      </Child>
    </Container>
  )
}
