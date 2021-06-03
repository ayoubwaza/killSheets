import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import { FaTrash, FaEdit, FaPowerOff, FaWindowClose } from "react-icons/fa";
import { Button,TextField } from '@material-ui/core';
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
    i{
      cursor: pointer;
      font-size: 23px;
      color: red;
    }
    div{
      margin-bottom: 10px;
    }
`;
function Data(props) {
  const [data, setData] = useState([]);
  const [Timer, setTimer] = useState(false);
  const [name,setName] = useState("");
  const [addresse,setAddresse] = useState("");
  const [city,setCity] = useState("");
  const [phone,setPhone] = useState("");
  const [formC, setFormc] = useState(false);
  const [dbId, setDbId] = useState("");
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8000/all")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
        setTimer(true)
    }, 7000);
  });
  //delete user
    const deleteUser = (id) => {
        axios.delete("http://localhost:8000/delete/user/"+id)
        .then((res) => {
            setData(data.filter((user) => {return  user._id !== id}))
        })
        .catch((err) => console.log(err));
    }
    //re-input full fields
    var inpuFields = (para) => {
        setFormc(true);
        setName(para.name);
        setCity(para.city);
        setPhone(para.phone);
        setAddresse(para.addresse);
        setDbId(para._id)
    }
    var dataUpdated = () => {
        var data = {
            name:name,
            city:city,
            addresse:addresse,
            phone:phone
        }
        axios
        .put("http://localhost:8000/update/user/"+dbId,data)
        .then((res) => alert(res.data),setFormc(false))
        .catch((err) => console.log(err));
    }
    const tableBody = () => {
    return data.map((user, i) => {
      return (
        <tr key={i}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.city}</td>
          <td>{user.addresse}</td>
          <td>
            <FaEdit onClick={() => inpuFields(user)} />
          </td>
          <td>
            <FaTrash onClick={() => deleteUser(user._id)} />
          </td>
        </tr>
      );
    });
  };
  const tableHead = () => {
    return (
      <tr>
        <th>_Id User</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Addresse</th>
        <th>Edit</th>
        <th>Remove</th>
      </tr>
    );
  };
  return (
    <div className="__Def">
      <GlobalStyle/>
        {
            formC ? (
                <Child>
        <h2>React w/ googleSheet</h2>
        <div>
          <i><FaWindowClose onClick={() => setFormc(!formC)}/></i>
        </div>
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
        <Button color='primary' variant="contained" onClick={dataUpdated}>click me</Button>
      </Child>
            )
            :
            null
        }
      {Timer ? (
        <React.Fragment>
          <Link to="/">Accueil</Link>
          <table>
            <thead>{tableHead()}</thead>
            <tbody>{tableBody()}</tbody>
          </table>
        </React.Fragment>
      ) : <h1>Loading...</h1>}
    </div>
  );
}
export default Data;
