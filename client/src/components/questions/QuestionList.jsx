import {useEffect, useState} from "react";
import axios from "axios";


function QuestionList(){
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        axios.get('http://localhost:3001/api/v1/questions', {
        }).then(response => {
            console.log("[+]<<<<", response.data);
            setQuestions(response.data.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    }


    if(!loading){
        return (
            <div className='list inline-table'>
            {questions.map((question, index) => (
                <h3 key={index}>{question.body}</h3>
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