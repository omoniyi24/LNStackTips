import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import questionService from "./question-service";
import answerService from "./answer-service";
import bodyParser from "body-parser";
import cors from "cors";


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
        res.json({ data: questionService.getAllQuestions() });
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
        questionService.createQuestion(questionTitle, questionBody, tags, isRewardableBoolean, numberRewardInSatoshi, numberVoteThreshold, '')
        res.sendStatus(201);
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

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});