import React, { Component, PureComponent } from 'react'; //different
import SimpleTableComponent from "reactjs-simple-table";
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../constants/constants";
import { useHistory } from 'react-router-dom';

const bookURL = "http://localhost:8080/api/books";
const authorURL = "http://localhost:8080/api/authors";
const libraryURL = "http://localhost:8080/api/libraries";
const personURL = "http://localhost:8080/api/people";
const addressURL = "http://localhost:8080/api/addresses";


const columnsBooks =
[
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "title",
    headerName: "Title",
  },
  {
    field: "isbn",
    headerName: "ISBN",
  },
  {
    field: "publication_date",
    headerName: "Publication date",
  },
  {
    field: "author_id",
    headerName: "Author ID",
  },
  {
    field: "library_id",
    headerName: "Library ID",
  }
]
const columnsAuthors =
[{
    field: "authorid",
    headerName: "Id",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "last_name",
    headerName: "Last name",
  },
]
const columnsLibraries =
[
  {
    field: "library_id",
    headerName: "Id",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "city",
    headerName: "City",
},]
const columnsPeople =
[
  {
    field: "person_id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "second_name",
    headerName: "Second name",
  },
  {
    field: "last_name",
    headerName: "Last name",
  },
  {
    field: "book_id",
    headerName: "Book ID",
  },
  {
    field: "address_id",
    headerName: "Address ID",
  },
]

const columnsAddress =
[
  {
    field: "address_id",
    headerName: "ID",
  },
  {
    field: "city",
    headerName: "City",
  },
  {
    field: "street",
    headerName: "Street",
  },
  {
    field: "postal_code",
    headerName: "Postal code",
  },
  {
    field: "country",
    headerName: "Country",
  },
]

const headers = new Headers({});

function Get(props) { 
  const history = useHistory();
  const [input, setInput] = React.useState('');
  const [book, setBook] = React.useState(null);
  const [author, setAuthor] = React.useState(null);
  const [library, setLibrary] = React.useState(null);
  const [person, setPerson] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const dataAddress = [];
  const dataPeople = [];
  const dataLibraries = [];
  const dataAuthors = [];
  const dataBooks = [];

  React.useEffect(() => {
    axios.all([
        axios.get(bookURL, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          }
      }),
        axios.get(authorURL, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          }
      }),
        axios.get(libraryURL, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          }
      }),
        axios.get(personURL, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
          }
      }),
        axios.get(addressURL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        })
      ])
      .then(axios.spread((responseBook,responseAuthor,responseLibrary, responsePerson, respondeAddress) => {
        setBook(responseBook.data);
        console.log(responseBook.data);
        setAuthor(responseAuthor.data);
        setLibrary(responseLibrary.data);
        setPerson(responsePerson.data);
        setAddress(respondeAddress.data);

        // use/access the results 
      }))
  }, []);

  if(!(dataBooks.length > 0) && book)
  book.map(book =>dataBooks.push({id:book.id, title:book.title, isbn:book.isbn, publication_date:book.publication_date, author_id:book.authorid, library_id:book.library_id}))

  if(!(dataAuthors.length > 0) && author)
  author.map(author =>dataAuthors.push({authorid:author.author_id, name:author.name, last_name:author.last_name}))

  if(!(dataLibraries.length > 0) && library)
  library.map(library =>dataLibraries.push({library_id:library.library_id, name:library.name, city:library.city}))

  if(!(dataPeople.length > 0) && person)
  person.map(person =>dataPeople.push({person_id:person.person_id, name:person.name, second_name:person.second_name, last_name:person.last_name, book_id:person.book_id, address_id:person.address_id}))

  if(!(dataAddress.length > 0) && address)
  address.map(address =>dataAddress.push({address_id:address.address_id, city:address.city, street:address.street, postal_code:address.postal_code, country:address.country}))
  console.log(props.authenticated);

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
        {input === 'KSIĄŻKI'? <SimpleTableComponent className="table" columns={columnsBooks} list={dataBooks} numberPerPage={5}/>: null }
        {input === 'AUTORZY'?  <SimpleTableComponent className="table" columns={columnsAuthors} list={dataAuthors} numberPerPage={5} />: null }
        {input === 'KSIĘGARNIE'? <SimpleTableComponent className="table" columns={columnsLibraries} list={dataLibraries} numberPerPage={5}/>: null }
        {input === 'CZYTELNICY'?  <SimpleTableComponent className="table" columns={columnsPeople} list={dataPeople} numberPerPage={5}/>: null }
        {input === 'ADRESY'? <SimpleTableComponent className="table" columns={columnsAddress} list={dataAddress} numberPerPage={5}/>: null }
           </div>
           </div>
           </div>
           </div>
       );
}

export default Get;