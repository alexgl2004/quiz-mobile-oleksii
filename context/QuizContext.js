import { createContext, useContext, useState, useRef } from "react";
//import { users } from "../data/data";
import { router } from "expo-router";
import { UserContext } from "../context/UserContext";

export const QuizContext = createContext();

export function QuizProvider({ children }) {

  const serverLink = 'http://alexgl.de:3000'

  const { user } = useContext(UserContext);
  
  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [quizzes, setQuizzes] = useState(null);
  const [nowQuizz, setNowQuizz] = useState(null);
  const responseData = useRef(null)

  function getAllUserQuizzes() {

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.userid
      })
    };

    console.log(user.userid)

    const response = fetch('http://'+serverLink+':3000/users/results/student', options)
    .then(response => {
//      console.log(response)
      return response.json()
    })
    .then(data => { 
//      console.log(user)
      console.log('test', data)
      if( data.resultsData.length>0){
        setQuizzes([...data.resultsData]);
      }
    })
    .catch(error => console.error(error));
  }

  function clearQuizzes() {
    setQuizzes(null);
  }

  
/**
 * 
 * @param {*} id 
 */ 
  function getUserQuizz(id) {

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.userid
      })
    };

    console.log(user.userid)

    const response = fetch('http://'+serverLink+':3000/users/results/'+id, options)
    .then(response => {
//      console.log(response)
      return response.json()
    })
    .then(data => { 
//      console.log(user)
      console.log('test', data)
      if( data.resultsData ){
        setNowQuizz(data);
      }

    })
    .catch(error => console.error(error));
  }


  return (
    <QuizContext.Provider
      value={{
        quizzes,
        clearQuizzes,
        setQuizzes,
        getAllUserQuizzes,
        getUserQuizz,
        nowQuizz,
        setNowQuizz
      }}
    >
      {children}
    </QuizContext.Provider>
  );

}
