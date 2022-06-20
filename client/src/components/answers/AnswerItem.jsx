import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import axios from "axios";
import {useState} from "react";
import QRCode from "react-qr-code";
import sha256 from "sha256";

function AnswerItem({answer}) {
    const [vote, setVote] = useState([])
    const [showAnswerQR, setShowAnswerQR] =  useState(false)
    const [claimSecret, setClaimSecret] =  useState('')
    const [showSecretField, setShowSecretField] =  useState(false)
    const [lnurl, setLnurl] =  useState(false)
    const [showError, setShowError] =  useState(false)



    const availableClaimMessage = "Claim Reward"
    const errorLnurl = 'Invalid Secret'

    const showSecret = () =>{
        setShowSecretField(true)
    }

    const validateSecret = () =>{
        console.log("Got Here")
        let sha = sha256(claimSecret);
        console.log("Got Here hash", sha)
        if (sha === answer.rewardHash){
            console.log("In IF", )
            handleRewardClaim()
        } else {
            console.log("In Else", )
            setShowError(true)
        }
    }

    const handleRewardClaim = () =>{
        console.log("Got here")
        setShowSecretField(false)
        let config = {
            headers: {
                "X-Api-Key": "0e17df906099426f8e9ef5b1b4b28a87",
            }
        }

        let data = {
            "title": "Omoniyi24 Withdraw",
            "min_withdrawable": 10,
            "max_withdrawable": 12,
            "uses": 1,
            "wait_time": 600000,
            "is_unique": true
        }

        axios.post('https://legend.lnbits.com/withdraw/api/v1/links', data, config).then(response => {
            let data = response.data
            console.log(data)
            if(data.lnurl) {
                setShowAnswerQR(true)
                setLnurl(data.lnurl)
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleVote = () =>{
        console.log(">>...", answer)
        axios.get('http://localhost:3001/api/v1/addvote/'+answer.id, {
        }).then(response => {
            let data = response.data.data;
            console.log(data)
            answer.voteCount = data.voteCount
            setVote(data.voteCount)
        }).catch((err) => {
            console.log(err)
        });
    }

    const readyToClaim = (answer) => {
        console.log("mmmmm", answer.readyToClaim)
        if (answer.readyToClaim) {
            return (
                <p className="text-white-700 text-base"><button
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleVote()}>{answer.voteCount}</button>
                    {answer.body}
                    <button className='ml-2 mr-1 badge badge-success' onClick={() => showSecret()}>{availableClaimMessage}</button>
                </p>
            )
        } else {
            return (
                <p className="text-white-700 text-base"><button
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={() => handleVote()}>{answer.voteCount}</button>
                    {answer.body}
                </p>
            )
        }
    }


    return (
        <>
            <div>
                <h1>{showError ?
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div
                                className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                <div
                                    className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div >
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <form>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex flex-col col-span-2">
                                                            <h3 className="text-lg leading-6 font-medium text-red-900"
                                                                id="modal-title">{errorLnurl}</h3>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :            <div>
                        <h1>{showSecretField ?
                            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                                <div className="fixed z-10 inset-0 overflow-y-auto">
                                    <div
                                        className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                        <div
                                            className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div >
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        {/*<h3 className="text-lg leading-6 font-medium text-gray-900"*/}
                                                        {/*    id="modal-title">Enter Secret To The Claim Hash</h3>*/}
                                                        <form>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="flex flex-col col-span-2">
                                                            <textarea maxLength="1000" rows="4" type="text" id="subject" name="subject"
                                                                      className="form-input px-3 py-2 rounded-md" placeholder="Enter Secret To The Claim Hash" required/>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end py-4">
                                                                <button type="submit"
                                                                        className="bg-blue-700 text-white font-bold py-2 px-4 rounded focus:ring focus:ring-blue-300 hover:bg-blue-500"
                                                                        onClick={() => validateSecret()}>
                                                                    Claim
                                                                </button>
                                                            </div>
                                                        </form>
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
                            : '' }</h1>
                    </div> }</h1>
            </div>

            <div>
                <h1>{showAnswerQR ?
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
                                                    id="modal-title">Scan QR With Lightning Wallet</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500"> <QRCode
                                                        fgColor="#053140"
                                                        bgColor="#f3f4f6"
                                                        value={lnurl}
                                                    /> </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : '' }</h1>
            </div>
            {readyToClaim(answer)}
        </>
    )
}

AnswerItem.protoTypes = {
    answer: PropTypes.object.isRequired
}

export default AnswerItem