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
        let response: any = await questionService.createQuestion(questionTitle, questionBody, tags, isRewardableBoolean, numberRewardInSatoshi, numberVoteThreshold);
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
        answerService.createAnswer(numberQuestionId, answerBody, claimHash)
    } catch(err) {
        next(err);
    }
});

app.put(apiBase + '/addvote/:id', async (req, res, next) => {
    try {
        console.log("see me");
        const  votecount = req.body.voteCount;
        console.log(votecount);
        
        const answerId = parseInt(req.params.id);
    if (answerId) {

        const result = answerService.updateVotecount(answerId, votecount);
        console.log(result);
        
        res.json({ data: result });
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
    // wagerService.createWager("Ilesanmi Omoniyi", "omoniyi24@gmail.com", "02a0c076d510f0d22f1aee8c0a01e0eed2f80c5bcf99bcb68c3f2dddcd9b454ba0")
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
});