import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import axios from "axios";
import AnswerList from "../answers/AnswerList";

function SelectedQuestionItem({question}) {

    console.log("====== ", question)

    return (
        <>
        <div className="p-10">
            <div className="max-w-full rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Mountain</div>
                        <p className="text-white-700 text-base">
                            I'm trying to run lighting-charge (https://github.com/ElementsProject/lightning-charge) on top of one of my 2 lightning (https://github.com/ElementsProject/lightning) instances. I am running 2 nodes using the script here: lightning/contrib/startup_regtest.sh. This file will start a bitcoin instance as well as 2 lightning nodes (/tmp/l1-regtest, /tmp/l2-regtest)
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tags</span>
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#lightning</span>
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#bolt11</span>
                    </div>
            </div>
        </div>
            <div className="p-10">
                <div className="max-w-full rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Answers</div>
                        <AnswerList question={question}/>
                        {/*<p className="text-white-700 text-base"><span*/}
                        {/*    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{1}</span>*/}
                        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores*/}
                        {/*    et perferendis eaque, exercitationem praesentium nihil.*/}
                        {/*</p>*/}
                        {/*<p className="text-white-700 text-base"><span*/}
                        {/*    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{3}</span>*/}
                        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores*/}
                        {/*    et perferendis eaque, exercitationem praesentium nihil.*/}
                        {/*</p>*/}
                        {/*<p className="text-white-700 text-base"><span*/}
                        {/*    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{2}</span>*/}
                        {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores*/}
                        {/*    et perferendis eaque, exercitationem praesentium nihil.*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>

        </>
    )
}

SelectedQuestionItem.protoTypes = {
    question: PropTypes.object.isRequired
}

export default SelectedQuestionItem