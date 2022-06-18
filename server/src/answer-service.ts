import {EventEmitter} from "events";
import {existsSync, promises as fs} from "fs";

const DB_FILE = '../db.json';

export interface Answer {
    id: number;
    questionId: number;
    body: string;
    rewardHash: string;
    isClaimed: boolean;
    readyToClaim: boolean;
    isPaid: boolean;
    voteCount: number;
    timeCreated: Date;
    timePaid: Date;
}

export interface DbData {
    answers: Answer[];
}

/**
 * The list of events emitted by the AnswerDB
 */
export const AnswerEvents = {
    updated: 'answer-updated',
};

/**
 * A very simple file-based DB to store the Answer
 */
export class AnswerService extends EventEmitter {

    // in-memory database
    private _data: DbData = {
        answers: [],
    };


    getAllAnswers() {
        return this._data.answers;
    }

    getAnswerById(answerId: number) {
        return this.getAllAnswers().find(answer => answer.id === answerId);
    }

    getAnswerByQuestionId(questionId: number) {
        return this.getAllAnswers().filter(answer => answer.questionId === questionId);
    }

    async createAnswer(questionId: number, body: string, rewardHash: string) {
        const maxId = Math.max(0, ...this._data.answers.map(p => p.id));

        const answer: Answer = {id: maxId + 1, questionId: questionId, body: body, rewardHash: rewardHash, isClaimed: false,
            readyToClaim: false, isPaid: false, voteCount: 0, timePaid: new Date(0), timeCreated: new Date()};
        this._data.answers.push(answer);

        await this.persist();
        this.emit(AnswerEvents.updated, answer);
        return answer;
    }

    updateAnswer(answerId: number, body: string, rewardHash: string, isClaimed: boolean, readyToClaim: boolean,
                 isPaid: boolean, voteCount: number) {
        const answer = this._data.answers.find(p => p.id === answerId);
        if (!answer) {
            throw new Error('Answer not found');
        }

        answer.rewardHash = rewardHash 
        answer.body = body
        answer.isClaimed = isClaimed
        answer.readyToClaim = readyToClaim
        answer.isPaid = isPaid
        answer.voteCount = voteCount
        this.persist();
        this.emit(AnswerEvents.updated, answer);
        return this.getAnswerById(answerId)
    }

    updateVotecount(answerId: number, voteCount: number) {
        const answer = this._data.answers.find(p => p.id === answerId);
        console.log(answer);
        
        if (!answer) {
            throw new Error('Answer not found');
        }

        answer.voteCount = answer.voteCount + voteCount;
        this.persist();
        this.emit(AnswerEvents.updated, answer);
        return this.getAnswerById(answerId)
    }

    //
    // HACK! Persist data to a JSON file to keep it when the server restarts.
    // Do not do this in a production app. This is just for convenience when
    // developing this sample app locally.
    //

    async persist() {
        await fs.writeFile(DB_FILE, JSON.stringify(this._data, null, 2));
    }

//     var currentSearchResult = 'example'

//     fs.readFile('results.json', function (err, data) {
//     var json = JSON.parse(data)
//     json.push('search result: ' + currentSearchResult)

//     fs.writeFile("results.json", JSON.stringify(json))
// })

    async restore() {
        if (!existsSync(DB_FILE)) return;

        const contents = await fs.readFile(DB_FILE);
        if (contents) {
            this._data = JSON.parse(contents.toString());
            if (!this._data.answers) this._data.answers = [];
            console.log(`Loaded ${this._data.answers.length} answers`);
        }
    }
}


export default new AnswerService();