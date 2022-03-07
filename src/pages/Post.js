import React, { Component, PureComponent } from 'react'; //different
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";

function Post() { 
  const history = useHistory();
  const [state, setState] = React.useState({
    bookTitle: "", bookISBN: "", bookProductionDate: "", bookAuthorID: "", bookLibraryID: "",
    authorName:"", authorLastName: "",
    libraryName:"", libraryCity: "",
    personName:"", personSecondName:"", personLastName: "", personBookID: "", personAddressID: "",
    addressCity:"", addressStreet: "", addressCountry:"", addressPostalCode: "",
  })
  const headers = new Headers({});
  const [input, setInput] = React.useState('');
  const [data, setData] = React.useState('');
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(input === "KSIĄŻKI")
    {
    axios.post('http://localhost:8080/api/book', {title: state.bookTitle,isbn: state.bookISBN,publication_date: state.bookProductionDate,authorid: state.bookAuthorID,library_id: state.bookLibraryID}, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(response.data)).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});}
    if(input === "AUTORZY")
    {
    axios.post('http://localhost:8080/api/author', {name: state.authorName, last_name:state.authorLastName}, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(".")).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});}
    if(input === "KSIĘGARNIE")
    {
      console.log(state.libraryCity);
    axios.post('http://localhost:8080/api/library', {name: state.libraryName, city:state.libraryCity}, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(".")).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});}
    if(input === "CZYTELNICY")
    {
    axios.post('http://localhost:8080/api/person', {name: state.personName, second_name:state.personSecondName, last_name:state.personLastName, book_id:state.personBookID, address_id:state.personAddressID}, {headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(".")).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});}
    if(input === "ADRESY")
    {
    axios.post('http://localhost:8080/api/address', {city: state.addressCity, street:state.addressCity, postal_code:state.addressPostalCode, country:state.addressCountry}, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(".")).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});
  console.log(data.data.error)}
}

  return (

    <div className='appMain'>
        <div className="containerTables">
        <div className='containerTablesButtons'>
        <button className="tablesButtons" onClick={()=> history.push("/")}>WRÓĆ</button>
        <button className="tablesButtons" onClick = {() => setInput("KSIĄŻKI")}>KSIĄŻKI</button>
        <button className="tablesButtons" onClick = {() => setInput("AUTORZY")}>AUTORZY</button>
        <button className="tablesButtons" onClick = {() => setInput("KSIĘGARNIE")}>KSIĘGARNIE</button>
        <button className="tablesButtons" onClick = {() => setInput("CZYTELNICY")}>CZYTELNICY</button>
        <button className="tablesButtons" onClick = {() => setInput("ADRESY")}>ADRESY</button>
        </div>
        <div className='menuTablesContainer2'>
        <div className="menuTablesPOST"></div>
        {input === 'KSIĄŻKI'? 
        <form className="formStyle" onSubmit={handleSubmit}>
          <label>Tytuł Książki:<br /><input type="text" name="bookTitle" value={state.bookTitle} onChange={handleChange} /></label>
          <label>ISBN: <br /><input type="text" name="bookISBN" value={state.bookISBN} onChange={handleChange} /></label>
          <label>Data Produkcji: <br/><input type="date" name="bookProductionDate" value={state.bookProductionDate} onChange={handleChange} /></label>
          <label>ID Autora: <br/><input type="number" name="bookAuthorID" min="10" max="99" value={state.bookAuthorID} onChange={handleChange} /></label>
          <label>ID Księgarni: <br/><input type="number" name="bookLibraryID" min="100" max="199" value={state.bookLibraryID} onChange={handleChange} /></label>
          <button type="submit">Add</button>
        </form>: null }
        {input === 'AUTORZY'? 
        <form className="formStyle" onSubmit={handleSubmit}>
          <label>Imię Autora<br /><input type="text" name="authorName" value={state.authorName} onChange={handleChange} /></label>
          <label>Nazwisko Autora <br /><input type="text" name="authorLastName" value={state.authorLastName} onChange={handleChange} /></label>
          <button type="submit">Add</button>
          {data === "."? <p>Dodano :) </p>: null}
        </form>: null }
        {input === 'KSIĘGARNIE'? 
        <form className="formStyle" onSubmit={handleSubmit}>
          <label>Nazwa Księgarni<br /><input type="text" name="libraryName" value={state.libraryName} onChange={handleChange} /></label>
          <label>Miasto<br /><input type="text" name="libraryCity" value={state.libraryCity} onChange={handleChange} /></label>
          <button type="submit">Add</button>
          {data === "."? <p>Dodano :) </p>: null}
        </form>: null }
        {input === 'CZYTELNICY'? 
        <form className="formStyle" onSubmit={handleSubmit}>
          <label>Imię<br /><input type="text" name="personName" value={state.personName} onChange={handleChange} /></label>
          <label>Drugie Imię<br /><input type="text" name="personSecondName" value={state.personSecondName} onChange={handleChange} /></label>
          <label>Nazwisko<br /><input type="text" name="personLastName" value={state.personLastName} onChange={handleChange} /></label>
          <label>ID Książki<br /><input type="number" name="personBookID" min="1" max="10" value={state.personBookID} onChange={handleChange} /></label>
          <label>ID Adresu<br /><input type="number" name="personAddressID" min="300" max="399" value={state.personAddressID} onChange={handleChange} /></label>
          <button type="submit">Add</button>
          {data === "."? <p>Dodano :) </p>: null}
        </form>: null }
        {input === 'ADRESY'? 
        <form className="formStyle" onSubmit={handleSubmit}>
          <label>Miasto<br /><input type="text" name="addressCity" value={state.addressCity} onChange={handleChange} /></label>
          <label>Ulica<br /><input type="text" name="addressStreet" value={state.addressStreet} onChange={handleChange} /></label>
          <label>Kod Pocztowy<br /><input type="text" name="addressPostalCode" value={state.addressPostalCode} onChange={handleChange} /></label>
          <label>Kraj<br /><input type="text" name="addressCountry" value={state.addressCountry} onChange={handleChange} /></label>
          <button type="submit">Add</button>
          {data === "."? <p>Dodano :) </p>: null}
        </form>: null }
        </div>
        </div>
        </div>
  );
}

export default Post;