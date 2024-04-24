import { useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { router } from "expo-router";
import { Typography } from "./Typography";
import { COLORS } from "../styles/constants";
import { QuizContext } from "../context/QuizContext";

export function QuizGo() {

    const { nowQuizz, setNowQuizz } = useContext(QuizContext);
    const [ showNext, setShowNext ] = useState(0); 
    const [ showPrev, setShowPrev ] = useState(0);
    const [ showFinish, setShowFinish ] = useState(0);
    const [ testFinished, setTestFinished ] = useState(0);
    const [ answersLine, setAnswersLine ] = useState([]);
/*
    if(nowQuizz.questionsData.length==answersLine.length){
      setShowNext(0)
      setShowFinish(1)
    }else{
      setShowNext(1)
      setShowFinish(0)
    }
*/

    const hidePrev = true;

    function goToNextPrevious(quiz_id,question_id,nextA=true){

      let nowQuestionIndex = nowQuizz.questionsData.findIndex((elem, idx)=>{
        return elem.quiz_id == quiz_id && elem.id == question_id
      })

      console.log(
        '------------',
//        nowQuizz.questionsData.length,
//        nowQuizz.questionsData,
        nowQuestionIndex,
        nowQuizz.resultsData.last_quiz,
        nowQuizz.resultsData.last_question
      )

//      nowQuestionIndex = -1

      if(nextA){
        setShowNext(0)
        if(nowQuestionIndex < nowQuizz.questionsData.length-1){
          nowQuestionIndex = nowQuestionIndex + 1
          if(showNext==0){
//            setShowNext(1)
          }
          if(showPrev==0 && !hidePrev){
            setShowPrev(1)
          }
        }else{
          if(showNext==1){
            setShowNext(0)
          }
        }
      }else{
        if(nowQuestionIndex > 0){
          nowQuestionIndex = nowQuestionIndex - 1
          if(showPrev==0 && !hidePrev){
            setShowPrev(1)
          }
          if(showNext==0){
//            setShowNext(1)
          }
        }else{
          setShowPrev(0)
        }
      }

      setNowQuizz(
        {...nowQuizz,
          resultsData: {...nowQuizz.resultsData,
                          last_quiz:nowQuizz.questionsData[nowQuestionIndex].quiz_id,
                          last_question:nowQuizz.questionsData[nowQuestionIndex].id
          }
        }
      )

    }

//    console.log(nowQuizz.quizData);

    const quizElem = (nowQuizz.resultsData.last_quiz?
      nowQuizz.quizData.filter((elem)=>{
        return elem.id==nowQuizz.resultsData.last_quiz
      })[0]:
      nowQuizz.quizData[0]
    )

//    console.log(quizElem)

    const questionElem = nowQuizz.questionsData.filter((elem)=>{
      if(nowQuizz.resultsData.last_question==0){
        return (
          elem.quiz_id==quizElem.id
        )
      }else{
        return (
          elem.id==nowQuizz.resultsData.last_question &&
          elem.quiz_id==quizElem.id
        )
      }
    })[0]

/*
    console.log(nowQuizz.resultsData.last_question)
    console.log(nowQuizz.questionsData)
    console.log(questionElem)
*/
    const answersElem = nowQuizz.answersData.filter((elem)=>{
      return elem.question_id==questionElem.id
    })
/*
    console.log('-----------------------------------------------------------')
    console.log(quizElem)
    console.log(questionElem)
    console.log(answersElem)
    console.log(answersLine)
*/
    return (<>
            
            <Typography variant="headingQuiz">
              {quizElem.name}
            </Typography>

            <Typography variant="paragraph">
              {quizElem.description}
            </Typography>

            <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, borderColor: COLORS.accent, marginBottom: 20 }}>
              {testFinished!=1?
                <>
                  <Typography variant="headingQuestion">
                    {questionElem.header}
                  </Typography>
                  <Typography variant="paragraphQuestion">
                    {questionElem.text}
                  </Typography>

                  <View style={{ padding: 15, backgroundColor:'#333', borderWidth: 1, borderRadius: 5, borderColor: '#333', marginBottom: 20 }}>

                    {console.log(answersLine)}

                    {answersElem.map((elem,index)=>{

                      const answerOne = (answersLine?answersLine.filter((elemI)=>{
    //                    console.log(elemI.id,'--',elem.id)
                        return elemI.id==elem.id
                      })[0]:null)
    
                      return (
                        <Pressable
                          key={elem.id + '_' + questionElem.id + '_' + quizElem.id}
                          style={{
                              paddingHorizontal:15,
                              paddingVertical:5,
                              marginBottom:5,
                              backgroundColor:(answerOne && answerOne.id==elem.id?COLORS.primary:COLORS.dark),
                              borderRadius:7
                          }}
                          onPress={() => {
    //                        console.log(answersLine)
                            setAnswersLine((prev)=>{

//                              console.log(prev)

                              const indexNow = (prev?prev.findIndex((elemI)=>{
                                return elemI.question_id == questionElem.id && elemI.quiz_id == quizElem.id
                              }):-1)

//                              console.log(indexNow)

                              if(indexNow==-1){
                                if(!prev){
                                  prev = []
                                }
                                prev.push(
                                  {
                                    id:elem.id,
                                    question_id:questionElem.id,
                                    quiz_id:quizElem.id,
                                    points:(elem.correct?questionElem.points:0),
                                    correct:elem.correct
                                  }
                                )
                              }else{
                                prev[indexNow] = 
                                {
                                  id:elem.id,
                                  question_id:questionElem.id,
                                  quiz_id:quizElem.id,
                                  points:(elem.correct?questionElem.points:0),
                                  correct:elem.correct
                                }                            
                              }

                              if(nowQuizz.questionsData.length==answersLine.length){
                                setShowNext(0)
                                setShowFinish(1)
                              }else{
                                setShowNext(1)
                                setShowFinish(0)
                              }

                              return [...prev]
                              
                            })


                          }}
                          color={COLORS.accent}
                        >
                          <Typography 
                            variant="paragraphQuestion"
                            style={{color:(answerOne && answerOne.id==elem.id?COLORS.dark:COLORS.light)}}
                          >{elem.answer}</Typography>
                        </Pressable>   
                      )
                    })}
                  </View>
                </>
                :
                <View style={{ padding: 15, backgroundColor:'#333', borderWidth: 1, borderRadius: 5, borderColor: 'yellow', marginBottom: 20 }}>
                  <Typography variant="paragraphQuestion" style={{color:'red'}}>
                    The test is finished!
                  </Typography>
                </View>
              }
            </View>


            <View style={{ paddingRight: 12, flex: 2, width: '100%', flexDirection: 'row' }}>
              {showPrev==1?
                <Pressable
                  style={{marginRight:10}}
                  onPress={() => {
                    goToNextPrevious(quizElem.id,questionElem.id,false)
                  }}
                  color={COLORS.accent}
                >
                  <Text style={globalStyles.button25}>Back</Text>
                </Pressable>
                :''
              }
              {showNext==1?
                <Pressable 
                  onPress={() => {
                    goToNextPrevious(quizElem.id,questionElem.id,true)
                  }}
                  color={COLORS.accent}
                >
                  <Text style={globalStyles.button25}>Next</Text>
                </Pressable>
                :''
              }
              {showFinish==1 && testFinished!=1?
                <Pressable 
                  onPress={() => {
                    setTestFinished(1)
                  }}
                  color={COLORS.accent}
                >
                  <Text style={globalStyles.button25}>Finish</Text>
                </Pressable>
                :''
              }
              <Pressable 
                  style={{ position:'absolute', right: 0 }}
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