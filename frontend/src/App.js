import React,{ useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import {AiOutlineClose} from 'react-icons/ai';

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");
  const [comments, setComments] = useState([]);
  const [textAreaComment, setTextAreaComment] = useState("");
  const [username, setUsername] = useState("");

  const apiKey = "AIzaSyCpUPsTb1dceiCOHxN2URx2vK-sBPywhXw";

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
    setModalState(oldState => !oldState);
  }

  function setActiveBook(item){
    setSelectedBook(item);
  }

  useEffect(() => {
   axios.get("http://localhost:8090/api/comments")
    .then(data => {
      const commentsFiltered = data.data.filter(c => c.bookName === selectedBook.volumeInfo.title);

      setComments(commentsFiltered);
    })
  }, [selectedBook])
  

  function handleTextAreaChange(e) {
    setTextAreaComment(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleTextAreaSubmit() {
    axios.post("http://localhost:8090/api/comments", {
      personName: username,
      personComment: textAreaComment,
      bookName: selectedBook.volumeInfo.title
    }).then(() => setActiveBook(oldState => oldState))    
  }

  return (
    <div className="Container">
      <div className={modalState ? 'modal ativo' : 'modal'}>
        {selectedBook &&
          <div>
            <h2>{selectedBook.volumeInfo.title}</h2>
            <img
              src={selectedBook.volumeInfo.imageLinks.thumbnail}
              alt={selectedBook.volumeInfo.title}
            />
            {selectedBook.volumeInfo.publishedDate && 
            <p className='ano-publicacao'><span>Ano de publicação:</span> {selectedBook.volumeInfo.publishedDate}</p>}
            
            {selectedBook.volumeInfo.description && 
            <p className='descricao'><span>Descrição: </span>{selectedBook.volumeInfo.description}</p>
            }
            <p className='comentarios'><span>Escrever um comentário:</span></p>
            <input className='username-input' type="text" placeholder='Seu nome' onChange={handleUsernameChange}  />
            <textarea placeholder='Seu comentário' onChange={handleTextAreaChange} className='escrever-comentario' />
            <button className='comentario-button' type="button" onClick={handleTextAreaSubmit}>Publicar</button>

            <p className='comentarios'><span>Comentários:</span></p>
            {comments && 
            comments.map((item, index) =>(
              <p className='comentario' key={index}><span>{item.personName}: </span>{item.personComment}</p>
            ))}
          </div>
        }
        <AiOutlineClose className='icon-close' onClick={() => toogleModalClass()} />
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
        item.volumeInfo.imageLinks &&
        <div key={index} onClick={() => [toogleModalClass(), setActiveBook(item)]}>
          <img className='book' src={item.volumeInfo.imageLinks.thumbnail} alt={item.title} />
        </div>
      ))}
      </div>
    </div>
  );
}
// href={item.volumeInfo.previewLink}
export default App;
