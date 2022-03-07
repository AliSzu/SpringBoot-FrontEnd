import React, { Component, PureComponent } from 'react'; //different
import SimpleTableComponent from "reactjs-simple-table";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";


const bookURL = "http://localhost:8080/api/books";
const authorURL = "http://localhost:8080/api/authors";
const libraryURL = "http://localhost:8080/api/libraries";
const personURL = "http://localhost:8080/api/people";
const addressURL = "http://localhost:8080/api/addresses";

let bookIDs;
let listBookIDs;
let authorIDs;
let listAuthorIDs;
let libraryIDs;
let listLibraryIDs;
let personIDs;
let listPersonIDs;
let addressIDs;
let listAddressIDs;

function Delete() { 
  const headers = new Headers({});
  const history = useHistory();
  const [input, setInput] = React.useState('');
  const [book, setBook] = React.useState(null);
  const [author, setAuthor] = React.useState(null);
  const [library, setLibrary] = React.useState(null);
  const [person, setPerson] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    axios.all([
        axios.get(bookURL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}),
        axios.get(authorURL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}),
        axios.get(libraryURL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}),
        axios.get(personURL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}}),
        axios.get(addressURL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
      ])
      .then(axios.spread((responseBook,responseAuthor,responseLibrary, responsePerson, respondeAddress) => {
        setBook(responseBook.data);
        setAuthor(responseAuthor.data);
        setLibrary(responseLibrary.data);
        setPerson(responsePerson.data);
        setAddress(respondeAddress.data);

        // use/access the results 
      }))
  }, []);

  if(book)
  {
    bookIDs = []
    listBookIDs = []
    book.map(book =>bookIDs.push(book.id))
    for (let i = 0; i < bookIDs.length; i++) {
    listBookIDs.push(<button className='buttonDeleteID' id={i} onClick = {() => handleDelete(`http://localhost:8080/api/book/${bookIDs[i]}`, i)}>{bookIDs[i]}</button>);}
  };

  if(author)
  {
    authorIDs = []
    listAuthorIDs = []
    author.map(author =>authorIDs.push(author.author_id))
    console.log(authorIDs)
    for (let i = 0; i < authorIDs.length; i++) {
    listAuthorIDs.push(<button className='buttonDeleteID' id={i} onClick = {() => handleDelete(`http://localhost:8080/api/author/${authorIDs[i]}`, i)}>{authorIDs[i]}</button>);}
  };

  if(library)
  {
    libraryIDs = []
    listLibraryIDs = []
    library.map(library =>libraryIDs.push(library.library_id))
    for (let i = 0; i < libraryIDs.length; i++) {
    listLibraryIDs.push(<button className='buttonDeleteID' id={i} onClick = {() => handleDelete(`http://localhost:8080/api/library/${libraryIDs[i]}`, i)}>{libraryIDs[i]}</button>);}
  };
  if(person)
  {
    personIDs = []
    listPersonIDs = []
    person.map(person =>personIDs.push(person.person_id))
    for (let i = 0; i < personIDs.length; i++) {
    listPersonIDs.push(<button className='buttonDeleteID' id={i} onClick = {() => handleDelete(`http://localhost:8080/api/person/${personIDs[i]}`, i)}>{personIDs[i]}</button>);}
  };
  if(address)
  {
    addressIDs = []
    listAddressIDs = []
    address.map(address =>addressIDs.push(address.address_id))
    for (let i = 0; i < addressIDs.length; i++) {
    listAddressIDs.push(<button className='buttonDeleteID' id={i} onClick = {() => handleDelete(`http://localhost:8080/api/address/${addressIDs[i]}`, i)}>{addressIDs[i]}</button>);}
  };

  function handleDelete(URL, i){
    axios.delete(URL, {headers: {'Content-Type': 'application/json','Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
    .then(response =>setData(".")).catch((error) => {setData(JSON.parse(JSON.stringify(error.response)));});
    document.getElementById(i).remove()
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
        <div className='menuTablesContainer'>
        <div className="menuTables">
        {input === 'KSIĄŻKI'? <div className="containerDelete">Którą książkę usunąć?<br/><br />{listBookIDs}{data === "."? <p>Usunięto :) </p>: null}
       </div>: null }
       {input === 'AUTORZY'? <div className="containerDelete">Którego autora usunąć?<br/><br />{listAuthorIDs}{data === "."? <p>Usunięto :) </p>: null}
       </div>: null }
       {input === 'KSIĘGARNIE'? <div className="containerDelete">Którą księgarnie usunąć?<br/><br />{listLibraryIDs}{data === "."? <p>Usunięto :) </p>: null}
       </div>: null }
       {input === 'CZYTELNICY'? <div className="containerDelete">Którego czytelnika usunąć?<br/><br />{listPersonIDs}{data === "."? <p>Usunięto :) </p>: null}
       </div>: null }
       {input === 'ADRESY'? <div className="containerDelete">Który adres usunąć?<br/><br />{listAddressIDs}{data === "."? <p>Usunięto :) </p>: null}
       </div>: null }
           </div>
           </div>
           </div>
           </div>
       );
}

export default Delete;