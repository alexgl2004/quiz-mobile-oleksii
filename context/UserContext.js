import { createContext, useContext, useState, useRef } from "react";
//import { users } from "../data/data";
import { router } from "expo-router";
import { path_server } from "../path";

export const UserContext = createContext();

export function UserProvider({ children }) {

  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [user, setUser] = useState(null);//useState({'email':'test','password':'12345','name':'test','userid':'123456785'});
  const responseData = useRef(null)

    function login(name, password) {

//    let nemeEmailed= (name.indexOf('@')!=-1?name.toLowerCase():name.toLowerCase() + '@test.com')

/*
    const options2 = {
      method: 'GET',
    };

    const response2 = fetch(path_server+'/users', options2)
    .then(response2 => response2.json())
    .then(data => { 
      console.log('test', data)
    })

*/
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: name,
        password: password
      })
    };

    const response = fetch(path_server+'/users/login', options)
    .then(response => {
//      console.log(response)
      return response.json()
    })
    .then(data => { 
      console.log('test', data, name, password)
      if( data.userdata && data.userdata.password == password && data.userdata.login == name){
        setUser(
          {
            name: data.userdata.name,
            surname: data.userdata.surname,
            school: data.userdata.school,
            email: data.userdata.email,
            login: data.userdata.login,
            userid: data.userdata.id,
            role: data.userdata.role
          }
        );

        router.push('');

      }else{
        alert('Wrong Email or Password!')
      }
    })
    .catch(error => console.error(error));
  }

  function loginQR(QRlink) {

//        logout()
//    setUser(null);

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        QR: QRlink,
      })
    };

    const response = fetch(path_server+'/users/login/qr', options)
    .then(response => {
//      console.log(response)
      return response.json()
    })
    .then(data => { 
//      console.log('test', data)
      if( data.userdata.id ){
        setUser(
          {
            name: data.userdata.name,
            surname: data.userdata.surname,
            school: data.userdata.school,
            email: data.userdata.email,
            login: data.userdata.login,
            userid: data.userdata.id,
            role: data.userdata.role
          }
        );

        router.replace('/rooms/'+data.results_id);

      }else{
        alert('Wrong Email or Password!')
      }
    })
    .catch(error => console.error(error));
  }  

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loginQR,
      }}
    >
      {children}
    </UserContext.Provider>
  );

}
