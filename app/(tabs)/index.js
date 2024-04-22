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
  const [promo, setPromo] = useState('none');
  const [boolOutForPromo, setOutForPromo] = useState(false);

  const { user, setUserPromo, delUserPromo } = useContext(UserContext);
  const header_var = (<Typography variant="heading">Promo code</Typography>);

  useEffect(() => {
    if(user!=null){
      if(user.promoactive==true){
        setOutForPromo(true)
      }else{
        setOutForPromo(false)
      }
      setPromo('none')
    }else{
      setOutForPromo(false)
      setPromo('none')
    }
  },[user]);

  if (!permission){
    //alert('Permisson problem');
    return <></>;
  }

  if ( (permission && !permission.granted) || !permission){
    return (
      <View style={globalStyles.container}>
        <Text>Camera permission is required</Text>
        <Pressable onPress={requestPermission} style={globalStyles.buttonScan}>
          <Text style={globalStyles.buttonText}>Get access</Text>
        </Pressable>        
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handlePromoCode(data){
    if(data.data){
      setPromo(data.data);
    }    
  }

  function sendPromo(promo){
    setUserPromo(promo)
  }

  if(user==null){
    return (
      <ScrollView style={globalStyles.container}>
          {header_var}
          <LoginText />
      </ScrollView>
    )

  }else if(promo=='none'){

    return (
      <View style={globalStyles.container}>
          {header_var}
          {
            boolOutForPromo===true?(
            <Text style={globalStyles.p}>
                You have applied promo code. If You want have another promo code, You can:
            </Text>):''
          }
          <Pressable onPress={()=>setPromo('')} style={globalStyles.buttonScan}>
            <Text style={globalStyles.buttonText}>Scan new</Text>
          </Pressable>
          {boolOutForPromo===true?(
            <>
              <Text style={globalStyles.p}>
                Or:
              </Text>
              <Pressable onPress={()=>delUserPromo()} style={globalStyles.buttonCancel}>
                <Text style={globalStyles.buttonText}>Remove</Text>
              </Pressable>
            </>):''
          }

      </View>    
    )

  }else if(promo!=''){

//    console.log(promo+100)
    
    return (
        <View style={globalStyles.container}>
          {header_var}    
          <Pressable onPress={()=>setPromo('')} style={globalStyles.buttonScan}>
            <Text style={globalStyles.buttonText}>Rescan</Text>
          </Pressable>

          <Text style={globalStyles.PromoText}>
            🎉 Congratulation 🎉
          </Text>
          <Text style={globalStyles.p}>You have successfully received a promo code.</Text>
          <Text style={globalStyles.p}>
            If you would like to apply a promotional code to purchases in our store, please click the button below:
          </Text>

          <Pressable onPress={()=>sendPromo(promo)} style={globalStyles.buttonSend}>
            <Text style={globalStyles.buttonTextSend}>Apply</Text>
          </Pressable>
        </View>
      )

  }else{

//    console.log("user", user);
    return (
      <View style={globalStyles.container}>
        {header_var}
        <View style={globalStyles.cameraView}>
        <CameraView style={globalStyles.camera} facing={facing} barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }} onBarcodeScanned={handlePromoCode}>
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity style={globalStyles.buttonFlip} onPress={toggleCameraFacing}>
              <Text style={globalStyles.textFlip}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        </View>
        <Pressable onPress={()=>setPromo('none')} style={globalStyles.buttonCancel}>
          <Text style={globalStyles.buttonText}>Cancel scan</Text>
        </Pressable>
      </View>
    );
  }
}