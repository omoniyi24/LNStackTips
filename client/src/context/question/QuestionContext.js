import { createContext} from "react";
import {useState} from "react";
import axios from "axios";

const QuestionContext = createContext()

const QUESTION_URL = process.env.QUESTIONS_URL

export const QuestionProvider = ({children}) => {
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDashboard, setShowDashboard] = useState(false)

    const fetchQuestions = async () => {
        axios.get('http://localhost:3001/api/v1/questions', {
        }).then(response => {
            setQuestions(response.data.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    const fetchAnswers = async (questionId) => {
        axios.get('http://localhost:3001/api/v1/answer/questionId/'+questionId, {
        }).then(response => {
            setAnswers(response.data.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    }

    const fetchQuestion = async (questionId) => {
        axios.get('http://localhost:3001/api/v1/question/' + questionId, {
        }).then(response => {
            let data = response.data.data;
            setQuestion(data)
        }).catch((err) => {
            console.log(err)
        });
    }

    return <QuestionContext.Provider value={{
        questions,
        loading,
        fetchQuestions,
        answers,
        fetchAnswers,
        showDashboard,
        setShowDashboard,
        question,
        fetchQuestion
    }}>
        {children}
    </QuestionContext.Provider>

}

export default QuestionContext