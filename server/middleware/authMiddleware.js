//protects backend API so that only logged-in users can access 
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

//initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp();
}

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //decodes token

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = await getAuth().verifyIdToken(token); //checks if token is valid
    req.user = decoded; //add Firebase user to request, req.user.uid
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;