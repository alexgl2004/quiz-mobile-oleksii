import { Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import { useContext, useState, useEffect } from "react";
import { globalStyles } from "../../styles/global";
import { Typography } from "../../components/Typography";
import { LoginText } from "../../components/LoginText";
import { UserContext } from "../../context/UserContext";

export default function HomePage() {

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [room, setRoom] = useState('none');
//  const [boolOutForRoom, setOutForRoom] = useState(false);

  const { user, setUserRoom, delUserRoom, loginQR } = useContext(UserContext);
  const header_var = (<Typography variant="heading">Room code</Typography>);

  useEffect(() => {
    if(user!=null){
      if(user.roomactive==true){
//        setOutForRoom(true)
      }else{
//        setOutForRoom(false)
      }
      setRoom('none')
    }else{
//      setOutForRoom(false)
      setRoom('none')
    }
  },[user]);

  if( ( (permission && !permission.granted) || !permission) && user==null ){

    return (
      <View style={globalStyles.container}>
        <Text>Camera permission is required</Text>
        <Pressable onPress={requestPermission} style={globalStyles.buttonScan}>
          <Text style={globalStyles.buttonText}>Get access</Text>
        </Pressable>        
      </View>
    );

  }

  if (!permission && user==null){
    alert('Permisson problem');
    console.log('Permisson problem');
    return <></>;
  }
  

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleRoomCode(data){
    if(data.data){
      loginQR(data.data);
//      setRoom(data.data);
    }    
  }

  if(user==null && room=='none'){
    return (
      <>
        <ScrollView style={globalStyles.container}>

            {header_var}

            <LoginText />

            <Pressable onPress={()=>setRoom('')} style={globalStyles.buttonScan}>
              <Text style={globalStyles.buttonText}>Scan QR</Text>
            </Pressable>

          </ScrollView>
      </>
    )

  }else if(user!=null && room!=''){

//    console.log(room+100)
    
    return (
        <View style={globalStyles.container}>
          {header_var}
          <Text style={globalStyles.p}>Hello, {user.title} {user.name} {user.surname}.</Text>
          <Text style={globalStyles.p}>Login: {user.login}</Text>
          <Text style={globalStyles.p}>You can use QR scan for jumping in another test</Text>
          <Text style={globalStyles.p}>(Beetwen your accounts too).</Text>

          <Pressable onPress={()=>setRoom('')} style={globalStyles.buttonScan}>
              <Text style={globalStyles.buttonText}>Scan QR</Text>
          </Pressable>
        </View>
      )

  }else{

//    console.log("user------------", room);

    return (
      <View style={globalStyles.container}>
        {header_var}
        <View style={globalStyles.cameraView}>
        <CameraView style={globalStyles.camera} facing={facing} barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }} onBarcodeScanned={handleRoomCode}>
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity style={globalStyles.buttonFlip} onPress={toggleCameraFacing}>
              <Text style={globalStyles.textFlip}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        </View>
        <Pressable onPress={()=>setRoom('none')} style={globalStyles.buttonScan}>
          <Text style={globalStyles.buttonText}>Cancel</Text>
        </Pressable>        
      </View>
    );
  }
}