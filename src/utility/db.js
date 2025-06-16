// src/utils/db.js
import { openDB } from "idb";

const DB_NAME = "VideoArchiveDB";
const STORE_NAME = "archives";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function addArchive(archive) {
  const db = await initDB();
  await db.add(STORE_NAME, archive);
}

export async function getAllArchives() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function getArchiveById(id) {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}
