import "dotenv/config";
import { Keypair } from '@solana/web3.js';

let privateKey = process.env["SEKRET_KEY"];
if(privateKey === undefined){
    console.log("add SEKRET_KEY to .env!");
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public Key : ${keypair.publicKey.toBase58()}`);
//Public Key : 2yh5e9ZKMocjiDEu2UQmDE3aR3CdgczKYehTnczcCmab