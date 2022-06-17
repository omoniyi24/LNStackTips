import {useEffect, useState} from "react";
import QuestionList from "../components/questions/QuestionList";
import axios from "axios";
import QuestionContext from "../context/question/QuestionContext";
import {useContext} from "react";
import  {useParams} from "react-router-dom";
import QuestionItem from "../components/questions/QuestionItem";
import SelectedQuestionItem from "../components/questions/SelectedQuestionItem"


function Question(){
    const [text, setText] = useState('')
    const [claimHash, setClaimHash] = useState('')
    const {question, getQuestion} = useContext(QuestionContext)

    const params = useParams()

    useEffect(() => {
        getQuestion(params.questionId)
    }, [])

    const handleAnswerChange = (e) => setText(e.target.value)
    const handleClaimHashChange = (e) => setClaimHash(e.target.value)

    const createAnswer = (questionId, answer, claimHash) => {
        axios.post('http://localhost:3001/api/v1/answer', {
            questionId: questionId,
            answerBody: answer,
            claimHash: claimHash,
        }).then(response => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text === ''){
            alert('Please enter answer')
        } else {
            //call create answer API
            console.log(">>> text 2", text)
            console.log(">>> claimHash 2", claimHash)
            createAnswer(1, text, claimHash)
            setText('')
            setClaimHash('')
        }
    }

    return (
        <>
            <div className='list inline-table'>
                    <SelectedQuestionItem question={question} />
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col col-span-2">
                            {/*<label htmlFor="subject">Subject</label>*/}
                            <input type="text" id="subject" name="subject" className="form-input px-3 py-2 rounded-md" placeholder="Claim Hash"  value={claimHash} onChange={handleClaimHashChange} required />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="subject">
                                <div className="flex align-items">
                                    {/*Question Body*/}
                                    <span className="ml-auto opacity-75">Max. 1000 characters</span>
                                </div>
                            </label>
                            <textarea maxLength="1000" rows="4" type="text" id="subject" name="subject"
                                      className="form-input px-3 py-2 rounded-md" placeholder="Answer" value={text} onChange={handleAnswerChange} required/>
                        </div>
                    </div>
                    <div className="flex justify-end py-4">
                        <button type="submit"
                                className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500">
                            Post Your Answer
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Question