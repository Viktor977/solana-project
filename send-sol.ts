import 'dotenv/config';
import {
    Keypair,
    PublicKey,
    clusterApiUrl,
    Connection ,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL,
    SystemProgram,
} from '@solana/web3.js';


let privateKey = process.env["SEKRET_KEY"];
if(privateKey === undefined){
    console.log('Add SEKRET_KEY to env!');
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);
const recipient = new PublicKey('ARJvsSych1fbdwNMQ1e7H6ssWrxzsvqsA3CjRg8tLVLr');

const connection = new Connection(clusterApiUrl("devnet"));
const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
   fromPubkey : sender.publicKey,
   toPubkey : recipient,
   lamports : 0.01 * LAMPORTS_PER_SOL 
});

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

  
console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);
console.log(`✅ Transaction confirmed, signature: ${signature}!`);

const memoProgram = new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
  );
  
  const memoText = "Hello from Solana!";
  
  const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: sender.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from(memoText, "utf-8"),
    programId: memoProgram,
  });
  
  transaction.add(addMemoInstruction);
  
  console.log(`📝 memo is: ${memoText}`);
  

