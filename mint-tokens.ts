import 'dotenv/config';
import { getExplorerLink } from '@solana-developers/helpers';
import { Keypair,clusterApiUrl,Connection, PublicKey } from '@solana/web3.js';
import { createMint, mintTo } from "@solana/spl-token";

let privateKey = process.env["SEKRET_KEY"];
if(privateKey === undefined){
    console.log('Add SEKRET_KEY to env!');
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10,2);
const tokenMintAccount = new PublicKey("6Yc3hMHqK6d7ANWY4xuDbBJLwEkCm18gzAJJtJokSKfM");
const recipientAssociatedTokenAccount = new PublicKey("D2x7txNcPb8Docbmu6uvRrfaiuE1G4kwPKMLTGv9Uvya");

const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS 
);

const link = getExplorerLink("transaction",transactionSignature,"devnet");
console.log("Success!");
console.log(`Mint token transaction ${link}`);