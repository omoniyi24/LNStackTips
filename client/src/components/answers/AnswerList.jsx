import {useEffect, useContext} from "react";
import QuestionContext from "../../context/question/QuestionContext";
import AnswerItem from "./AnswerItem";


function AnswerList({question}){
    const {answers, loading, fetchAnswers} = useContext(QuestionContext)

    useEffect(() => {
        fetchAnswers(question.id)
    }, [])

    if(!loading){
        return (
            <div className='list inline-table'>
            {answers.map((answer, index) => (
                // <h3 key={index}>{question.body}</h3>
                <AnswerItem key={answer.id} answer={answer} />
            ))}
        </div>
        )
    }else {
        return (
            <h3>Loading...</h3>
        )
    }
}

export default AnswerList