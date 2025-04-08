import {
    Connection,
    clusterApiUrl,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction
  } from "@solana/web3.js";
  
  import {
    createUpdateMetadataAccountV2Instruction,
    DataV2
  } from "@metaplex-foundation/mpl-token-metadata";
  
  import dotenv from "dotenv";
  dotenv.config();
  
  const connection = new Connection(clusterApiUrl("devnet"));
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  
  // 🔐 Витягуємо приватний ключ з .env
  const privateKey = process.env["SEKRET_KEY"];
  if (!privateKey) throw new Error("SEKRET_KEY not found in .env");
  const user = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
  
  // 🔑 Mint токена, метадані якого хочеш оновити
  const tokenMint = new PublicKey("6Yc3hMHqK6d7ANWY4xuDbBJLwEkCm18gzAJJtJokSKfM");
  
  // 📍 Обчислюємо PDA для метаданих
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  
  // ✍️ Нові метадані
  const newMetadata: DataV2 = {
    name: "NewBootcampCoin 💥",
    symbol: "NEW",
    uri: "https://arweave.net/your-updated-json-link",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };
  
  // 🧾 Формуємо інструкцію
  const updateIx = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: user.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: newMetadata,
        updateAuthority: user.publicKey,
        primarySaleHappened: null,
        isMutable: true,
      },
    }
  );
  
  // 🚀 Відправляємо транзакцію
  const tx = new Transaction().add(updateIx);
  await sendAndConfirmTransaction(connection, tx, [user]);
  
  console.log("✅ Метадані оновлено!");
  