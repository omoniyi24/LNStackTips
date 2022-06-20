import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import questionService from "./question-service";
import answerService from "./answer-service";
import bodyParser from "body-parser";
import cors from "cors";
import { node, initNode } from './node';
import env from "./env";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const apiBase = process.env.API_BASE;
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));




// Routes

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to LNStackTips Server');
});

//QUESTION ROUTEs

app.get(apiBase + '/questions', async (req, res, next) => {
    try {
        res.json({ data: questionService.getAllPaidQuestions() });
    } catch(err) {
        next(err);
    }
});

app.get(apiBase + '/question/:id', (req, res) => {
    const questionById = questionService.getQuestionById(parseInt(req.params.id));
    if (questionById) {
        res.json({ data: questionById });
    } else {
        res.status(404).json({ error: `No Question found with ID ${req.params.id}`});
    }
});

app.post(apiBase + '/question', async (req, res, next) => {
    try {
        const {questionTitle, questionBody, tags, isRewardable, rewardInSatoshi, voteThreshold} = req.body;
        if (!questionTitle || !questionBody) {
            res.status(400).json({ error: 'Any of Fields questionTitle, questionBody, isRewardable are required to make a question'});
        }
        const isRewardableBoolean = Boolean(isRewardable);
        let numberRewardInSatoshi = parseInt(rewardInSatoshi);
        let numberVoteThreshold = parseInt(voteThreshold);
        if (isRewardable) {
            if (!rewardInSatoshi || !voteThreshold) {
                res.status(400).json({ error: 'Fields rewardInSatoshi and voteThreshold are required if Rewardable is true'});
            }
        }
        let response: any = await questionService.createQuestion(questionTitle, questionBody, tags, isRewardableBoolean, numberRewardInSatoshi, numberVoteThreshold, false);
        if( response ){
            console.log("2mmmmmmmmm ????/", response)
            res.json({ status: "00", message: "Please pay invoice to proceed",data: {invoice: response.payreq}});
        } else {
            res.json({ status: "01", message: "Failed"});

        }
        // res.sendStatus(201);
    } catch(err) {
        next(err);
    }
});


//ANSWER ROUTES
app.get(apiBase + '/answers', async (req, res, next) => {
    try {
        res.json({ data: answerService.getAllAnswers() });
    } catch(err) {
        next(err);
    }
});

app.get(apiBase + '/answer/:id', (req, res) => {
    const answerById = answerService.getAnswerById(parseInt(req.params.id));
    if (answerById) {
        res.json({ data: answerById });
    } else {
        res.status(404).json({ error: `No Question found with ID ${req.params.id}`});
    }
});

app.get(apiBase + '/answer/questionId/:questionId', (req, res) => {
    const answerByQuestId = answerService.getAnswerByQuestionId(parseInt(req.params.questionId));
    if (answerByQuestId) {
        res.json({ data: answerByQuestId });
    } else {
        res.status(404).json({ error: `No Question found with ID ${req.params.questionId}`});
    }
});

app.post(apiBase + '/answer', async (req, res, next) => {
    try {
        const {questionId, answerBody, claimHash} = req.body;
        if (!questionId || !answerBody) {
            res.status(400).json({ error: 'Any of Fields questionId and answerBody are required to make a answer'});
        }
        const numberQuestionId = parseInt(questionId);
        const question = questionService.getQuestionById(numberQuestionId);
        if(!question){
            res.status(400).json({ error: `Invalid Question  ID ${questionId}`});
        }
        res.sendStatus(201);
        answerService.createAnswer(numberQuestionId, answerBody, claimHash, false, 0)
    } catch(err) {
        next(err);
    }
});

app.get(apiBase + '/addvote/:id', async (req, res, next) => {
    try {
        const answerId = parseInt(req.params.id);
    if (answerId) {

        const answer = answerService.updateVotecount(answerId, 1);
        console.log(answer);
        if (answer){
            let questionById1 = questionService.getQuestionById(answer.questionId);
            if (questionById1){
                if(answer.voteCount == questionById1.voteThreshold){
                    answerService.updateReadyToClaim(answer.id, true)
                }
            }
        }
        let answerByIdResponse = answerService.getAnswerById(answerId);
        res.json({ data: answerByIdResponse });
        res.sendStatus(201)
    } else {
        res.status(404).json({ error: `No Question found with ID ${req.params.id}`});
    }

    } catch (error) {

    }
})


//NODE ROUTE
app.get(apiBase + '/node/info', async (req, res, next) => {
    try {
        const info = await node.getInfo();
        const { balance } = await node.channelBalance();
        res.send({info, balance});
        next();
    } catch(err) {
        next(err);
    }
});


// Initialize node & server
console.log('Initializing Lightning node...');
initNode().then(() => {
    console.log('Lightning node initialized!');
    console.log('Starting server...');
    questionService.createQuestion("My lightning node is unreachable and lightning-rpc': Connection refused",
        "I'm trying to use c-lightning on my raspberry. When start the lightning daemon I get two errors:",
        "lightning-rpc", true, 10, 2, true)
    answerService.createAnswer(1, "Response to question1 (My lightning node is unreachable and lightning-rpc': Connection refused)",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", true, 1)

    questionService.createQuestion("Run lightning-charge on c-lightning regtest",
        "I'm trying to run lighting-charge (https://github.com/ElementsProject/lightning-charge) on top of one of my 2 lightning (https://github.com/ElementsProject/lightning) instances. I am running 2 nodes using the script here: lightning/contrib/startup_regtest.sh. This file will start a bitcoin instance as well as 2 lightning nodes (/tmp/l1-regtest, /tmp/l2-regtest)",
        "regtest", false, 10, 2, true)
    answerService.createAnswer(1, "Response to question2 (trying to run lighting-charge (https://github.com/ElementsProject/lightning-charge) on",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", true, 1)

    questionService.createQuestion("lightning to lightning non custodial swaps",
        "Do you know the way to freeze funds in lightning tx to implement atomic swap between two independent lightning networks?",
        "custodial", true, 10, 2, true)
    answerService.createAnswer(1, "Response to question3 (Do you know the way to freeze funds in lightning...",
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", false, 0)
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});