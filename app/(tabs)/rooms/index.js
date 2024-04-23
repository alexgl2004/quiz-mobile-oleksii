import { useContext, useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable } from "react-native";
import { router } from "expo-router";
import { globalStyles } from "../../../styles/global";
import { Typography } from "../../../components/Typography";
import { UserContext } from "../../../context/UserContext";
import { QuizContext } from "../../../context/QuizContext";
import { COLORS } from "../../../styles/constants";

export default function Rooms() {

    const header_var = (<Typography variant="heading">All your available Quizzes</Typography>);
    const { quizzes, getAllUserQuizzes } = useContext(QuizContext);
    const { user, login } = useContext(UserContext);

    useEffect(() => {
      if(quizzes==null && user!=null){
        getAllUserQuizzes()
      }
    },[quizzes]);

    if(user==null){
//      login('student1','1') //for tests
      router.replace('/login')
    }else{

      console.log(quizzes)

      return (
        <>
          <ScrollView style={globalStyles.container}>
              {header_var}
              <View>
                <Text style={globalStyles.p}>

                </Text>
                <View>
                  {quizzes!=null?quizzes.map((elem)=>{
                      return (
                      <>
                        {elem.isRunning==1?
                          <View style={{paddingHorizontal:15,paddingVertical:15,borderColor:COLORS.accent,borderWidth:2,marginBottom:5,borderRadius:10}}>
                            <Pressable
                              onPress={() => {
                                // Navigate after signing in. You may want to tweak this to ensure sign-in is
                                // successful before navigating.
                                router.replace('/rooms/'+elem.id);
                              }}>
                              <Text style={{color: COLORS.light}}>{elem.name}</Text>
                              {elem.date_start || elem.date_end?
                                <View>
                                  <Text style={{color: COLORS.primary}}>({elem.date_start?elem.date_start:'...'} - {elem.date_end?elem.date_end:'...'})</Text>
                                </View>:''
                              }         
                            </Pressable>                  
                          </View>
                        :''}
                      </>)
                  })
                  :''}
                </View>
              </View>
          </ScrollView>
        </>
      )
    }

}
/*
            <Link asChild style={globalStyles.link} href="actors">
                <Button color={COLORS.accent} title="Select Author" />
            </Link>
*/            
