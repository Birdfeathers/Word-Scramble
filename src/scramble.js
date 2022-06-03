import React, { useState, useEffect, useRef} from "react";
//import {readFileSync, promises as fsPromises} from 'fs';
//import { readFile } from "fs"; 
//const {readFileSync, promises: fsPromises} = require('fs')
import dictionary from './dictionary'




// function returnSorted(arr)
// {
//   let arr2 = [];
//  for(let i = 0;  i < arr.length; i++)
//    {
//      let remaining = arr.slice();
//      remaining.splice(i, 1);
//      let endings = returnSorted(remaining);
//      if(endings.length == 0) return [arr[i]];
//      for(let j = 0; j < endings.length; j++)
//        {
//          if(!arr2.includes(arr[i] + endings[j])){
         
//              arr2.push(arr[i] + endings[j]);
//             }

//        }
     
//    }
//    return arr2;
// }

function copyArrayintoArrayList(arr, prevArr, arrList, num)
{
  for(let j = 0; j < prevArr.length; j++)
    {
      let current = prevArr[j];
      if(!arrList[j]) 
        arrList.push(current);
      else{
         for(let k = 0; k < current.length; k++)
        {
          if(!arrList[j].includes(current[k])){
            arrList[j].push(current[k]);
          }
        }
      }
    }
  if(num === 0) arrList.push(arr);
  else {
    for(let i = 0; i < arr.length; i++)
    {
      if(!arrList[arrList.length -1]. includes(arr[i]))
      arrList[arrList.length - 1].push(arr[i]);
    }
  }
  return arrList;
}

function returnSorted([arr])
{
  let arr2 = [];
  let totalArr = [];
 for(let i = 0;  i < arr.length; i++)
   {
     let remaining = arr.slice();
     remaining.splice(i, 1);
     let returnedNum = returnSorted([remaining, totalArr]);
     let endings = returnedNum[0];
     totalArr = copyArrayintoArrayList(endings, returnedNum[1], totalArr, i);
     if(endings.length == 0) return [[arr[i]], totalArr];
     for(let j = 0; j < endings.length; j++)
       {
         if(!arr2.includes(arr[i] + endings[j])){
         
             arr2.push(arr[i] + endings[j]);
            }

       }
     
   }
   return [arr2, totalArr];
}


function checkWord(wordCheck)
{

  const wordArr = dictionary.split('\n');
  for(let i = 0; i < wordArr.length - 1; i++)
  {
    if(wordArr[i] === wordCheck) return true;
  }
  return false;
}

function WordList({list})
{
  return <div>
    {list.length == 0? <p>There are no words to show.</p>: 
        list.map((word, indx) => {
            return <p key = {indx}>{word}</p>
        })}
  </div>
}

function Scramble()
{
    const [scramble, setScramble] = useState([]);
    const [words, setWords] = useState([]);
    const [wordlists, setWordLists] = useState([]);
    const myContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
          console.log('useEffect running');
          try {
          } catch (err) {
            console.log(err);

    
        }}
        fetchData();
      }, []);

    return <div>
        <h2>Write the letters you would like unscrambled: </h2>
        <form onSubmit = { async(event) =>{
            event.preventDefault();
            setScramble(myContainer.current.value)
            const sorted = returnSorted([myContainer.current.value.split('')]);
            setWords(sorted[0].filter(word => checkWord(word)));
            console.log(sorted);
            setWordLists(sorted[1]);

        }}>
            <input type = "text" ref = {myContainer}></input>
            <input type = "submit"></input>
        </form>
        <h3>Full ({scramble.length} letter)Words from {scramble}: </h3>
        <WordList list = {words}/>
         {wordlists.reverse().map((list, indx) => {
           let length = wordlists.length;
           return <div key = {indx} > 
              {indx !== length - 1? <div> 
                <h3>{length - indx - 1} letter words: </h3>
                <WordList list = {list.filter(word => checkWord(word))} />
              </div>: null}
           </div>
         })}
       
    </div>
}



export default Scramble;