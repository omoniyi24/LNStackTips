import {useEffect, useContext} from "react";
import axios from "axios";
import questionItem from "./QuestionItem";
import QuestionItem from "./QuestionItem";
import QuestionContext from "../../context/question/QuestionContext";


function QuestionList(){
    const {questions, loading, fetchQuestions} = useContext(QuestionContext)

    useEffect(() => {
        fetchQuestions()
    }, [])

    if(!loading){
        return (
            <div className='list inline-table'>
            {questions.map((question, index) => (
                // <h3 key={index}>{question.body}</h3>
                <QuestionItem key={question.id} question={question} />
            ))}
        </div>
        )
    }else {
        return (
            <h3>Loading...</h3>
        )
    }
}

export default QuestionList