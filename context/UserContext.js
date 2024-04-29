import { createContext, useContext, useState, useRef } from "react";
//import { users } from "../data/data";
import { router } from "expo-router";
import { path_server } from "../path";

export const UserContext = createContext();

export function UserProvider({ children }) {

  const serverLink = 'alexgl.de'

  // user: null if not logged in
  // { name: string, lastLogin: Date }
  const [user, setUser] = useState(null);//useState({'email':'test','password':'12345','name':'test','userid':'123456785'});
  const responseData = useRef(null)

  function setUserRoom(room) { //this function mut be deleted

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'actionId':room})
    }; 

    const response = fetch('https://prj-backend-shopping-basket.onrender.com/user/' + user.userid + '/activateroomtion', options)
    .then(response => response.json())
    .then(data => { 
      console.log('test-AKT-------------------------'+"\n", user, room, data)

      setUser(
        {
          name: user.name,
          email: user.email,
          userid: user.userid,
          roomtionCode: room,
          roomactive: data.roomtion,
        }
      );      
      
      
//     console.log(data.name,name,'&&',data.password,password)
/*
      if( data.name && (data.name.toUpperCase()==name.toUpperCase() || data.email.toUpperCase()==name) && data.password == password){
        setUser(
          {
            name: data.name,
            email: data.email,
            userid: data.id,
            roomtion: data.roomtion,
          }
        );

        router.push('');

      }else{
        alert('Wrong Email or Password!')
      }
*/      
    })
    .catch(error => console.error(error));

  }

  function delUserRoom() { //this function mut be deleted

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({'actionId':"PROMO10"})
    }; 

    const response = fetch('https://prj-backend-shopping-basket.onrender.com/user/' + user.userid + '/deactivateroomtion', options)
    .then(response => response.json())
    .then(data => { 
      console.log('test-DEL-------------------------'+"\n", user, response, data)

      setUser(
        {
          name: user.name,
          email: user.email,
          userid: user.userid,
          roomtionCode: '',
          roomactive: false,
        }
      );            
      
    })
    .catch(error => console.error(error));

  }  

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
      if( data.userdata.password == password && data.userdata.login == name){
        setUser(
          {
            name: data.userdata.name,
            surname: data.userdata.surname,
            school: data.userdata.school,
            email: data.userdata.email,
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

        logout()
   
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
        setUserRoom,
        delUserRoom,
        loginQR,
      }}
    >
      {children}
    </UserContext.Provider>
  );

}
