import React,{ useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const apiKey = "your api key";

  function handleChange(event){
    const bookSearch = event.target.value;
    setBook(bookSearch);
  }

  function handleSubmit(event){
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=40")
    .then(data => {
      setResult(data.data.items);
    }).catch(e => console.log(e))
  }

  function toogleModalClass(){
    setModalState(!modalState);
  }

  function setActiveBlock(item){
    setSelectedBook(item);
  }

  return (
    <div className="Container">
      <div className={modalState ? 'modal ativo' : 'modal'}>
        {selectedBook ? 
          <div>
            <h2>{selectedBook.volumeInfo.title}</h2>
            <img
              src={selectedBook.volumeInfo.imageLinks.thumbnail}
              alt={selectedBook.volumeInfo.title}
            />
            <p>Ano de publicação: {selectedBook.volumeInfo.publishedDate}</p>
            {selectedBook.volumeInfo.description ? 
            <p>{selectedBook.volumeInfo.description}</p>
            : null}
          </div>
        : null}
      </div>
      <h1 className="Title">Book search app</h1>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <input
            type="text"
            className="InputControl"
            placeholder="Search for books"
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="BTN-Search">Search</button>
      </form>
      <div className='books'>
      {result.map((item, index) => (
        item.volumeInfo.imageLinks ?
        <div key={index} onClick={() => [ setActiveBlock(item)]}>
          <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.title} />
        </div> : null
      ))}
      </div>
    </div>
  );
}
// href={item.volumeInfo.previewLink}
export default App;
