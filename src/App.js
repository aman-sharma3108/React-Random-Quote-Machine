/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react';
import './App.scss';
import Colors from "./colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
  const [quote,setQuote] = useState("Wise men speak because they have something to say; fools because they have to say something")
  const [author,setAuthor]=useState("Plato")

  
  const [quotesArr,setquotesArr]=useState(null)

  const [accentColor,setaccentColor]=useState('#FF5252')


  const fetchQuotes= async (url)=>{
    const response = await fetch(url)
    const parse = await response.json()
    setquotesArr(parse.quotes)
    console.log(parse)
  }

  useEffect(()=>{
    fetchQuotes(quoteDB)
  },[quoteDB])

  const randomQuote=()=>{
    let randomNum = Math.floor(quotesArr.length*Math.random())
    setaccentColor(Colors[randomNum])
    setQuote(quotesArr[randomNum].quote)
    setAuthor(quotesArr[randomNum].author)
  }
  return (
    <div className="App">
      <header className="App-header" style={
        {backgroundColor:accentColor,color:accentColor}
      }>
        <div id="quote-box">
          

        <p id="text">
          "{quote}"
        </p>
        <p id="author">-{author}</p>
        <button id="new-quote" onClick={()=>randomQuote()} style={
        {backgroundColor:accentColor}
      }>Change Quote</button>
        <a id="tweet-quote" href={encodeURI('https://twitter.com/intent/tweet?text=${quote}-${author}')} style={
        {backgroundColor:accentColor}
      }><FontAwesomeIcon icon={faTwitter}/></a>
        </div>
        </header>
    </div>
  );
}

export default App;
