import dayjs from 'dayjs';
import { useContext, useState, useRef, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import { globalStyles } from "../styles/global";
import { router } from "expo-router";
import { Typography } from "./Typography";
import { COLORS } from "../styles/constants";
import { QuizContext } from "../context/QuizContext";

export function QuizGo(params) {

    const serverLink = 'https://alexgl.de:3000'

    const { nowQuizz, setNowQuizz } = useContext(QuizContext);
    
    const firstOpen = useRef(1);
    const dateOpenQuestion = useRef({});
    const nowDateTime = textDate(dayjs())

    const [ showNext, setShowNext ] = useState(0);
    const [ showPrev, setShowPrev ] = useState(0);
    const [ showFinish, setShowFinish ] = useState(0);

    const [ testFinished, setTestFinished ] = useState(nowQuizz.resultsData.finished);
    const [ answersLine, setAnswersLine ] = useState(nowQuizz.answerLine.map((elem)=>{
        return {
          id: elem.answer_id, 
          question_id: elem.question_id, 
          quiz_id: elem.quiz_id, 
          points: elem.points, 
          date_start:elem.date_start,
          date_end:elem.date_end,
          correct: elem.correct
        }
      }) 
    );
    
//    console.log('aaaaaaaaaaaaa',answersLine)
//    const [ statusSaved, setStatusSaved ] = useState(false);

    function addZerro(elem,type=''){
      elem = (['m','d'].includes(type) ? elem + 1 : elem)
      return (elem+'').padStart(2,'0')
    }

    function textDate(elem){
//      console.log('textDate',elem)
      return elem.$y+'-' + addZerro(elem.$M,'m')+'-'+addZerro(elem.$D,'d') + ' '+addZerro(elem.$H) + ':'+addZerro(elem.$m) + ':'+addZerro(elem.$s)
    }

//  

    const saveGoData = (goUserData,finished=0)=>{

//      console.log('saveGoData',goUserData)

      goUserData[goUserData.length-1] = {
        ...goUserData[goUserData.length-1],
        date_start: dateOpenQuestion.current.startTime,
        date_end: nowDateTime+''
      }

      dateOpenQuestion.current = {
        ...dateOpenQuestion.current,
        startTime: nowDateTime+'',
      }      

      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          goUserData: goUserData,
          finished: finished,
          maxPoints: nowQuizz.roomData.maxPoints,
          beginTest:dateOpenQuestion.current.beginTest,
          endTest: (finished?nowDateTime+'':''),
        })
      };

      const response = fetch('http://'+serverLink+':3000/users/results/'+nowQuizz.resultsData.id+'/save', options)
      .then(response => {
//        console.log(response)
        return response.json()
      })
      .then((data) => { 
          if(!data.status){
            alert('Data not saved! Try again')
          }
      })
      .catch(error => {
        console.error(error)
        alert('Data not saved! Try again')
      });


    }

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
/*
      console.log(
        '------------',
//        nowQuizz.questionsData.length,
//        nowQuizz.questionsData,
        nowQuestionIndex,
        nowQuizz.resultsData.last_quiz,
        nowQuizz.resultsData.last_question
      )
*/
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

//    useEffect(() => {
    if(nowQuizz.resultsData.last_quiz!=0 && firstOpen.current == 1){
      goToNextPrevious(nowQuizz.resultsData.last_quiz,nowQuizz.resultsData.last_question,true)
//        firstOpen.current = 0
    }else if(firstOpen.current == 1){
      dateOpenQuestion.current = {
        ...dateOpenQuestion.current,
        beginTest:nowDateTime+'',
        startTime:nowDateTime+'',
      }
    }

    firstOpen.current = 0

////body---------------------------------------------------------------------------    
//    console.log(nowQuizz.quizData);

    const quizElem = (nowQuizz.resultsData.last_quiz?
      nowQuizz.quizData.filter((elem)=>{
        return elem.id==nowQuizz.resultsData.last_quiz
      })[0]:
      nowQuizz.quizData[0]
    )

//    console.log('quizElem--',quizElem)

    const questionElem = nowQuizz.questionsData.filter((elem)=>{
      if(nowQuizz.resultsData.last_question==0){
        return (
          elem.quiz_id==quizElem.id
        )
      }else{

//        console.log(elem.id+'=='+nowQuizz.resultsData.last_question+'&&'+
//          elem.quiz_id+'=='+quizElem.id)

        return (
          elem.id==nowQuizz.resultsData.last_question &&
          elem.quiz_id==quizElem.id
        )
      }
    })[0]

//    console.log('questionElem--',questionElem)

//    console.log(nowQuizz)

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
                      let makeAnswerLine = [...answersLine]

                      const indexNow = (makeAnswerLine?makeAnswerLine.findIndex((elemI)=>{
                        return elemI.question_id == questionElem.id && elemI.quiz_id == quizElem.id
                      }):-1)

//                              console.log(indexNow)

                      if(indexNow==-1){
                        if(!makeAnswerLine){
                          makeAnswerLine = []
                        }
                        makeAnswerLine.push(
                          {
                            id:elem.id,
                            question_id:questionElem.id,
                            quiz_id:quizElem.id,
                            points:(elem.correct?questionElem.points:0),
                            correct:elem.correct
                          }
                        )
                      }else{
                        makeAnswerLine[indexNow] = 
                        {
                          id:elem.id,
                          question_id:questionElem.id,
                          quiz_id:quizElem.id,
                          points:(elem.correct?questionElem.points:0),
                          correct:elem.correct
                        }                            
                      }

                      setAnswersLine([...makeAnswerLine])

                      if(nowQuizz.questionsData.length==makeAnswerLine.length){
                        setShowNext(0)
                        setShowFinish(1)
                      }else{
                        setShowNext(1)
                        setShowFinish(0)
                      }

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
            {nowQuizz.resultsData.show_results==1?
              <>
                <Typography variant="paragraphQuestion" style={{color:'yellow',fontSize:20}}>Your Result: {nowQuizz.resultsData.result} / {nowQuizz.resultsData.max_points}</Typography>
              </>
            :''}
          </View>
        }
      </View>


      <View style={{ paddingRight: 12, flex: 2, width: '100%', flexDirection: 'row' }}>
        {showPrev==1?
          <Pressable
            style={{ position:'absolute', right: 0 }}
            
            onPress={() => {
              saveGoData(answersLine);
              goToNextPrevious(quizElem.id,questionElem.id,false);
            }}
            color={COLORS.accent}
          >
            <Text style={globalStyles.button25}>Back</Text>
          </Pressable>
          :''
        }
        {showNext==1?
          <Pressable 
            style={{ position:'absolute', right: 0 }}
            onPress={() => {

              saveGoData(answersLine);
              goToNextPrevious(quizElem.id,questionElem.id,true);
            }}
            color={COLORS.accent}
          >
            <Text style={globalStyles.button25}>Next</Text>
          </Pressable>
          :''
        }
        {showFinish==1 && testFinished!=1?
          <Pressable 
            style={{ position:'absolute', right: 0 }}
            onPress={() => {
              saveGoData(answersLine,1);
              setTestFinished(1)
            }}
            color={COLORS.accent}
          >
            <Text style={globalStyles.button25}>Finish</Text>
          </Pressable>
          :''
        }
      </View>
    </>

    )
}