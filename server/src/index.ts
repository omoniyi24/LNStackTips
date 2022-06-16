import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import questionService from "./question-service";
import bodyParser from "body-parser";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const apiBase = process.env.API_BASE;
app.use(bodyParser.json());



// Routes

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to LNStackTips Server');
});

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
        if (!questionTitle || !questionBody || !isRewardable) {
            throw new Error('Any of Fields questionTitle, questionBody, isRewardable are required to make a question');
        }
        const isRewardableBoolean = Boolean(isRewardable);
        let numberRewardInSatoshi = parseInt(rewardInSatoshi);
        let numberVoteThreshold = parseInt(voteThreshold);
        if (isRewardable) {
            if (!rewardInSatoshi || !voteThreshold) {
                throw new Error('Fields rewardInSatoshi and voteThreshold are required if Rewardable is true');
            }
        }
        questionService.createQuestion(questionTitle, questionBody, tags, isRewardableBoolean, numberRewardInSatoshi, numberVoteThreshold, '')
        res.sendStatus(201);
    } catch(err) {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});