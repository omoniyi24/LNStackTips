import {useState, useEffect} from "react";
import axios from "axios";
// import QRCode from 'qrcode.react';
import QRCode from "react-qr-code";
import io from "socket.io-client";

const socket = io("http://localhost:4000")

function AskQuestion() {
    const [paymentRequest, setPaymentRequest] = useState('')
    const [title, setTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [tags, setTags] = useState('')
    const [rewardInSatoshi, setRewardInSatoshi] = useState(0)
    const [voteThreshold, setVoteThreshold] = useState(0)
    const [rewardable, setRewardable] = useState(false)
    const [paid, setPaid] =  useState(false)
    const [showQR, setShowQR] =  useState(false)



    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleQuestionBodyChange = (e) => setQuestionBody(e.target.value)
    const handleTagsChange = (e) => setTags(e.target.value)
    const handleRewardInSatoshiChange = (e) => setRewardInSatoshi(e.target.value)
    const handleVoteThresholdChange = (e) => setVoteThreshold(e.target.value)
    const handleRewardableChange = (e) => setRewardable(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(title && questionBody){
            createQuestion()
        }

        setTitle('')
        setQuestionBody('')
        setTags('')
        setRewardInSatoshi(0)
        setVoteThreshold(0)
        setRewardable(false)

    }

    const handlePaymentEvent = (isPiad) => {
        console.log("=== Paid is ..", isPiad)
        if(isPiad){
            console.log("=== Switching...")
            setShowQR(false)
            window.location = '/'
        }
        console.log("=== Not Switching...")
    }

    useEffect(() => {
        socket.on("paymentInfo", (args => {
            console.log("HEEEEEEEEEY",args )
            let obj = JSON.parse(args);
            if(obj.paid){
                console.log("HEEEEEEEEEY2",obj.paid )
                setPaid(true);
                // setPaymentRequest("Paid!!!")
                handlePaymentEvent(obj.paid)
            }
            console.log("HEEEEEEEEEY3",obj.paid )

        }))
    }, []);

    const createQuestion = () => {
        axios.post('http://localhost:3001/api/v1/question', {
            questionTitle: title,
            questionBody: questionBody,
            tags: tags,
            isRewardable: rewardable,
            rewardInSatoshi: rewardInSatoshi,
            voteThreshold: voteThreshold
        }).then(response => {
            console.log(">>><<<<", response.data)
            let invoice = response.data.data.invoice;

            if(invoice !== "No Payment Request Needed") {
                if(invoice.length > 30){
                    setShowQR(true)
                }
                setPaymentRequest(invoice)
            }
        }).catch((err) => {
            console.log(err)
        });
    }


    return (
        <>
            {/*<div>*/}
            {/*    <h1>{paymentRequest.length > 30 ? <QRCode*/}
            {/*        fgColor="#053140"*/}
            {/*        bgColor="#f3f4f6"*/}
            {/*        value={paymentRequest}*/}
            {/*    /> : paymentRequest }</h1>*/}
            {/*</div>*/}
            <div>
                <h1>{showQR ?
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div
                                className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                <div
                                    className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900"
                                                    id="modal-title">Scan QR to Pay for Reward</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500"> <QRCode
                                                        fgColor="#053140"
                                                        bgColor="#f3f4f6"
                                                        value={paymentRequest}
                                                    /> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">*/}
                                    {/*    <button type="button"*/}
                                    {/*            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Paid*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    : paymentRequest }</h1>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col col-span-2">
                            <input type="text" id="subject" name="subject" className="form-input px-3 py-2 rounded-md"
                                   placeholder="Title" value={title} onChange={handleTitleChange}
                                   required/>
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="subject">
                                <div className="flex align-items">
                                    {/*Message*/}
                                    <span className="ml-auto opacity-75">Max. 1000 characters</span>
                                </div>
                            </label>
                            <textarea maxLength="500" rows="4" type="text" id="subject" name="subject"
                                      className="form-input px-3 py-2 rounded-md" placeholder="Question"
                                      value={questionBody} onChange={handleQuestionBodyChange} required/>
                        </div>
                        <div className="flex flex-col">
                            <input type="text" id="first-name" name="first-name" className="form-input px-3 py-2 rounded-md"
                                   placeholder="Tags" value={tags} onChange={handleTagsChange} />
                        </div>
                        <div>
                            <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" value={rewardable} onChange={handleRewardableChange}
                                       id="default-toggle" className="sr-only peer"/>
                                <div
                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span
                                    className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Rewardable</span>
                            </label>
                        </div>

                        {/*<div>*/}
                            {rewardable ? <>
                                <div className="flex flex-col">
                                    <input type="text" id="first-name" name="first-name" className="form-input px-3 py-2 rounded-md"
                                           placeholder="Reward in Satoshi" value={rewardInSatoshi}
                                           onChange={handleRewardInSatoshiChange}
                                           required/>
                                </div>
                                <div className="flex flex-col">
                                    <input type="text" id="last-name" name="last-name" className="form-input px-3 py-2 rounded-md"
                                           placeholder="Vote threshold" value={voteThreshold} onChange={handleVoteThresholdChange}
                                           required/>
                                </div>
                            </> : '' }
                        {/*</div>*/}


                    </div>
                    <div className="flex justify-end py-4">
                        <button type="submit"
                                className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default AskQuestion