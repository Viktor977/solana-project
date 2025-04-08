import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as dotenv from "dotenv";

// Завантажуємо змінні з файлу .env, якщо такий є
dotenv.config();

const prefix = "VS"; // шукаємо ключ, який починається з цього префіксу
let attempts = 0;

console.time("🔍 Знайдено за");

while (true) {
  const keypair = Keypair.generate();
  const pubkey = keypair.publicKey.toBase58();

  attempts++;
  if (pubkey.startsWith(prefix)) {
    console.timeEnd("🔍 Знайдено за");
    console.log(`✅ Публічний ключ: ${pubkey}`);
    console.log(`🔐 Приватний ключ (base58): [${keypair.secretKey.slice(0, 5)}... truncated]`);
    console.log(`🔁 Кількість спроб: ${attempts}`);

    // Записуємо ключі в .env
    const privateKey = keypair.secretKey.toString();//'base58'
    const publicKey = pubkey;
    const envData = `PRIVATE_KEY=${privateKey}\nPUBLIC_KEY=${publicKey}\n`;

    fs.writeFileSync('.env', envData, 'utf-8');
    console.log('✅ Ключі збережено в .env');

    break;
  }

  if (attempts % 1000 === 0) {
    console.log(`⏳ Перевірено: ${attempts}`);
  }
}
