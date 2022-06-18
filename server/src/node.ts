import createLnRpc, { LnRpc } from '@radar/lnrpc';
import env from './env';
import {Server} from "socket.io";
import questionService from "./question-service";





const io = new Server(4000, {
  cors: {
    origin: '*',
  }
})


export let node: LnRpc;

export async function initNode() {
  node = await createLnRpc({
    server: env.LND_GRPC_URL,
    cert: new Buffer(env.LND_TLS_CERT, 'base64').toString('ascii'),
    macaroon: new Buffer(env.LND_MACAROON, 'base64').toString('hex'),
  });

  let emitSocketEvent: any;

  io.on('connection', (socket:any) => {
    console.log('A user connected');
    emitSocketEvent = socket;
  });

  const stream = node.subscribeInvoices();
  stream.on('data', invoice => {
    if (invoice.settled) {
      const hash = (invoice.rHash as Buffer).toString('base64');
      const amount = invoice.amtPaidSat;
      console.log('Invoice Has Been Paid......');

      let questionByHash = questionService.getQuestionByHashAndNotPaid(hash);
      if (questionByHash && !questionByHash.isPaid){
        console.log('Invoice Has Been Paid......');
        questionByHash.isPaid = true
        let question = questionService.updateQuestionToPaid(questionByHash.id);
          if (question){
            let data = {paid: true, amount: amount, questionId: question.id}
            console.log('Emitting Socket......', data);
            emitSocketEvent.emit("paymentInfo", JSON.stringify(data));
          }
      }
    }
  });


}
