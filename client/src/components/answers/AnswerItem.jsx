import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import axios from "axios";

function AnswerItem({answer}) {

    const availableClaimMessage = "NEW"



    const readyToClaim = (answer) => {
        if (answer.readyToClaim) {
            return (
                <p className="text-white-700 text-base"><span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{answer.voteCount}</span>
                    {answer.body} <div className='ml-2 mr-1 badge badge-success'>{availableClaimMessage}</div>
                </p>
            )
        } else {
            return (
                <p className="text-white-700 text-base"><span
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{answer.voteCount}</span>
                    {answer.body}
                </p>
            )
        }
    }


    return (
        <>
            {readyToClaim(answer)}
        </>
    )
}

AnswerItem.protoTypes = {
    answer: PropTypes.object.isRequired
}

export default AnswerItem