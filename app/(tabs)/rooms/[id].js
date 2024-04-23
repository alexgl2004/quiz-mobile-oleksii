import { useContext, useState, useEffect } from "react";
import { Text, ScrollView, Button, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { globalStyles } from "../../../styles/global";
import { Typography } from "../../../components/Typography";
import { QuizGo } from "../../../components/QuizGo";
import { UserContext } from "../../../context/UserContext";
import { QuizContext } from "../../../context/QuizContext";

export default function Room() {

    const { nowQuizz, getUserQuizz } = useContext(QuizContext);
    const { user } = useContext(UserContext);
    const [runningQuiz, setRunningQuiz] = useState(0)

    const { id } = useLocalSearchParams();

    useEffect(() => {
      if(nowQuizz==null && user!=null){
        getUserQuizz(id)
      }
    },[nowQuizz]);

//    console.log('aaa',nowQuizz,'aaa')

    return (
      <>
        {nowQuizz!=null?(
          <ScrollView style={globalStyles.container}>
            <Typography variant="heading">{nowQuizz.roomData.name}</Typography>
            {runningQuiz==1?
              <QuizGo />:
              <>
                <Text style={globalStyles.p}>
                  {nowQuizz.roomData.description}
                </Text>
                <View  style={{width:'100%',marginHorisontal:'auto',color:'black',alignItems:'center'}}>
                  <Button
                    title={nowQuizz.resultsData.last_quiz==0 && nowQuizz.resultsData.last_question==0?'Start':'Continue'}
                    onPress={()=>{
                      setRunningQuiz(1)
                    }} 
                  />
                </View>
              </>
            }
          </ScrollView>)
        :
        ''}
      </>
    )

}