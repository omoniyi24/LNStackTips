import {node, initNode} from './node';


export class LNNodeService {

    generateInvoice = async (amount: number, questionId: number) => {
        // create an invoice for a Question
        const inv = await node.addInvoice({value: amount.toString(), memo: 'LNStackTips Txn'+questionId});
        const response = {
            payreq: inv.paymentRequest,
            hash: (inv.rHash as Buffer).toString('base64'),
            amount,
        }
        return response;
    }

}


export default new LNNodeService();