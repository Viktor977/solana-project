import { Connection,LAMPORTS_PER_SOL,PublicKey,clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const publicKey = new PublicKey("2yh5e9ZKMocjiDEu2UQmDE3aR3CdgczKYehTnczcCmab");
const balanceInSol = await  connection.getBalance(publicKey) / LAMPORTS_PER_SOL;
console.log(`My balance:${balanceInSol} SOL`);