import { useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { router } from "expo-router";
import { Typography } from "./Typography";
import { COLORS } from "../styles/constants";
import { QuizContext } from "../context/QuizContext";

export function QuizGo() {

    const { nowQuizz, setNowQuizz } = useContext(QuizContext);

    console.log(nowQuizz.quizzesData[0].questions);
    console.log(nowQuizz.quizzesData[0].questions[0].answers);

    return (<>
            <Typography>
              You must login before SCAN
            </Typography>
            <View style={{ paddingRight: 12 }}>
              <Pressable
                onPress={() => {
                  router.replace("/rooms/"+nowQuizz.resultsData.id);
                }}
                color={COLORS.accent}
              >
                <Text style={globalStyles.button25}>Defer</Text>
              </Pressable>
            </View>
          </>
 
    )
}