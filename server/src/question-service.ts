import {EventEmitter} from "events";
import {existsSync, promises as fs} from "fs";

const DB_FILE = '../db.json';

export interface Question {
    id: number;
    title: string;
    body: string;
    tags: string;
    isRewardable: boolean;
    rewardInSatoshi: number;
    voteThreshold: number;
    timeCreated: Date;
    paymentHash: string;
}

export interface DbData {
    questions: Question[];
}

/**
 * The list of events emitted by the QuestionDB
 */
export const QuestionEvents = {
    updated: 'question-updated',
};

/**
 * A very simple file-based DB to store the Question
 */
export class QuestionService extends EventEmitter {

    // in-memory database
    private _data: DbData = {
        questions: [],
    };


    getAllQuestions() {
        return this._data.questions;
    }

    getQuestionById(questionId: number) {
        return this.getAllQuestions().find(question => question.id === questionId);
    }

    async createQuestion(title: string, body: string, tags: string, isRewardable: boolean,
                         rewardInSatoshi: number, voteThreshold: number, paymentHash: string) {
        const maxId = Math.max(0, ...this._data.questions.map(p => p.id));

        const question: Question = {id: maxId + 1, title: title, body: body, tags: tags, isRewardable: isRewardable,
            rewardInSatoshi: rewardInSatoshi, voteThreshold: voteThreshold, timeCreated: new Date(), paymentHash: paymentHash};
        this._data.questions.push(question);

        await this.persist();
        this.emit(QuestionEvents.updated, question);
        return question;
    }

    updateQuestion(questionId: number, title: string, body: string, tags: string, isRewardable: boolean,
                   rewardInSatoshi: number, voteThreshold: number) {
        const question = this._data.questions.find(p => p.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        question.title = title
        question.body = body
        question.tags = tags
        question.isRewardable = isRewardable
        question.rewardInSatoshi = rewardInSatoshi
        question.voteThreshold = voteThreshold
        this.persist();
        this.emit(QuestionEvents.updated, question);
        return this.getQuestionById(questionId)
    }

    //
    // HACK! Persist data to a JSON file to keep it when the server restarts.
    // Do not do this in a production app. This is just for convenience when
    // developing this sample app locally.
    //

    async persist() {
        await fs.writeFile(DB_FILE, JSON.stringify(this._data, null, 2));
    }

    async restore() {
        if (!existsSync(DB_FILE)) return;

        const contents = await fs.readFile(DB_FILE);
        if (contents) {
            this._data = JSON.parse(contents.toString());
            if (!this._data.questions) this._data.questions = [];
            console.log(`Loaded ${this._data.questions.length} questions`);
        }
    }

}


export default new QuestionService();