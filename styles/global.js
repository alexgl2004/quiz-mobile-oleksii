import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "./constants";

export const globalStyles = StyleSheet.create({
  camera: {
    height:'100%',
    width:'100%',
  },
  cameraView:{
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.accent,
    height:'50%',
    width:'100%',
    padding:10,
    backgroundColor: '#000'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.dark,
  },
  p: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
    width:"100%",
    textAlign:"justify",
    marginBottom:15,
    paddingHorizontal:10
  },
  pCenter: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 0,
    fontFamily: FONTS.sansSerif,
    width:"100%",
    textAlign:"center",
    marginBottom:2
  },
  p2: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  h1: {
    fontSize: 26,
    color: COLORS.accent,
    marginBottom: 12,
    fontFamily: FONTS.sansSerifBold,
  },
  h2: {
    fontSize: 20,
    color: COLORS.light,
    marginBottom: 8,
    fontFamily: FONTS.sansSerif,
  },
  link: {
    fontSize: 18,
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
  },
  linkOrdered: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONTS.sansSerif,
  },
  linkOrdered80: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONTS.sansSerif,
    width:"80%",
  },
  button20: {
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    fontSize: 16,
    padding:5,
//    backgroundColor: COLORS.primary,    
//    backgroundColorRadius: 10,
  },
  button25: {
    width: 80,
    textAlign: 'center',
    color: COLORS.accent,
    fontFamily: FONTS.sansSerif,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    fontSize: 16,
    padding:5,
//    backgroundColor: COLORS.primary,    
//    backgroundColorRadius: 10,
  },
  viewFlex: {
    flex:1,
    flexDirection: 'row',
    fontSize: 18,
    color: COLORS.grey,
    fontFamily: FONTS.sansSerif,
    borderBottomWidth: 2,
    borderBottomColor: "#444",
    paddingBottom:10,
  },
  input: {
    backgroundColor: COLORS.light,
    color: COLORS.dark,
    padding: 12,
    borderRadius: 6,
    fontFamily: FONTS.sansSerif,
    fontSize: 18,
  },
  buttonCancel:{
    alignSelf:"center",
    borderWidth: 2,
    borderColor: COLORS.cancel,
    borderRadius: 10,
    padding:18,
    backgroundColor: COLORS.cancel,
    margin:5,
    marginTop:20
  },
  buttonScan:{
    alignSelf:"center",
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 10,
    padding:18,
    backgroundColor: COLORS.accent,
    marginTop:40
  },
  buttonSend:{
    alignSelf:"center",
    borderWidth: 2,
    borderColor: COLORS.accept,
    borderRadius: 10,
    padding:18,
    backgroundColor: COLORS.accept,
  },
  buttonText:{
    color:'#fff',
    fontSize: 18,    
  },
  textFlip:{
    color:'#fff',
    fontSize: 12,
    textAlign: "center",
  },
  buttonTextSend:{
    color:'#fff',
    fontSize: 25,
  },
  buttonFlip:{
    borderWidth: 2,
    borderColor: COLORS.dark,
    borderRadius: 5,
    padding:2,
    backgroundColor: COLORS.dark,
    width:100,
    margin:2,
  },
  PromoText:{
    color:'#fff',
    fontSize: 25,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },
});
