import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { Button, TextField } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPdf from "react-to-pdf";
import "./Css/data.css";
import { SpinnerCircular } from 'spinners-react';
var GlobalStyle = createGlobalStyle`
  body{
    width:100%;
    height:100vh;
    background:linear-gradient(-45deg,#E5E7E9 50%,skyblue 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    margin: 0%;
    padding: 0%;
  }
`;
function Data(props) {
  const [data, setData] = useState([]);
  const [Timer, setTimer] = useState(false);
  const [name, setName] = useState("");
  const [addresse, setAddresse] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [formC, setFormc] = useState(false);
  const [dbId, setDbId] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const refPdef = useRef();
  const deltaGet = async () => {
    try{
      var Axdata = await axios.get("http://localhost:8000/all/varikostop")
      .then((res) => setData(res.data));
      setTimer(true)
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    deltaGet()
  },[]);

  //delete user
  const deleteUser = (id) => {
    axios
      .delete("http://localhost:8000/delete/user/" + id)
      .then((res) => {
        setData(
          data.filter((user) => {
            return user._id !== id;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  //re-input full fields
  var inpuFields = (para) => {
    setFormc(true);
    setName(para.name);
    setCity(para.city);
    setPhone(para.phone);
    setAddresse(para.addresse);
    setDbId(para._id);
  };
  var dataUpdated = () => {
    var data = {
      name: name,
      city: city,
      addresse: addresse,
      phone: phone,
    };
    axios
      .put("http://localhost:8000/update/user/" + dbId, data)
      .then((res) => alert(res.data), setFormc(false))
      .catch((err) => console.log(err));
  };
  const tableBody = () => {
    return data.map((user, i) => {
      return (
        <tr key={i}>
          <td><input type="checkbox" name="checkbox"/>{user._id}</td>
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
      <GlobalStyle />
      {formC ? (
        <section className='data__Section'>
          <div className="data_Container">
          <h2>React w/ googleSheet</h2>
          <div>
            <i>
              <FaWindowClose onClick={() => setFormc(!formC)} />
            </i>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Addresse"
              type="text"
              value={addresse}
              onChange={(e) => setAddresse(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="City"
              type="tel"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <Button color="primary" variant="contained" onClick={dataUpdated}>
            click me
          </Button>
        </div>
        </section>
      ) : null}
      {Timer ? (
        <React.Fragment>
          <Link to="/">Accueil</Link>
          <div className='flx__btns'>
            <div>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="data__excel_btn"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as XLS"
              />
            </div>
            <div>
              <ReactToPdf targetRef={refPdef} filename="code-example.pdf">
                {({ toPdf }) => (
                  <button id="pdf" onClick={toPdf}>
                    Download as PDF
                  </button>
                )}
              </ReactToPdf>
            </div>
          </div>
          <table ref={refPdef} id="table-to-xls">
            <thead>{tableHead()}</thead>
            <tbody>{tableBody()}</tbody>
          </table>
        </React.Fragment>
      ) : (
        <h1><SpinnerCircular	/></h1>
      )}
    </div>
  );
}
export default Data;
