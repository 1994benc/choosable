import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import fs from "fs";

let testEnv: RulesTestEnvironment;
const myUserId = "my_user_id";
const theirUserId = "their_user_id";

describe("user security rules", () => {
  beforeAll(async () => {
    try {
      testEnv = await initializeTestEnvironment({
        projectId: "choosable-dev",
        firestore: {
          rules: fs.readFileSync("firestore.rules", "utf8"),
          host: "localhost",
          port: 8080,
        },
      });
      return testEnv;
    } catch (e) {
      console.error(e);
    }
  });

  it("user should be able to create their own user document in the database", async () => {
    const myAuth = testEnv.authenticatedContext(myUserId);
    const docRef = doc(myAuth.firestore(), "users", myUserId);
    await assertSucceeds(setDoc(docRef, { name: "Name" }));
  });

  it("user should not be able to create other user's document in the database", async () => {
    const myAuth = testEnv.authenticatedContext(myUserId);
    const docRef = doc(myAuth.firestore(), "users", theirUserId);
    await assertFails(setDoc(docRef, { name: "Name" }));
  });

  it("user should be able to update their own user document in the database", async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const docRef = doc(ctx.firestore(), "users", myUserId);
      await setDoc(docRef, { name: "myName" });
    });

    const myAuth = testEnv.authenticatedContext(myUserId);
    const docRef = doc(myAuth.firestore(), "users", myUserId);
    await assertSucceeds(setDoc(docRef, { name: "Name" }));
  });

  it("user should NOT be able to update other user's document in the database", async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const docRef = doc(ctx.firestore(), "users", theirUserId);
      await setDoc(docRef, { name: "myName" });
    });

    const myAuth = testEnv.authenticatedContext(myUserId);
    const docRef = doc(myAuth.firestore(), "users", theirUserId);
    await assertFails(setDoc(docRef, { name: "Name" }));
  });

  it("anyone can read user data", async () => {
    const ctx = testEnv.unauthenticatedContext();
    const collectionRef = collection(ctx.firestore(), 'users');
    await assertSucceeds(getDocs(collectionRef))
  })

  afterAll(async () => {
    await testEnv.clearFirestore();
    await testEnv.cleanup();
  })
});
