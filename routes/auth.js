import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserInfo from "../models/UserInfo.js";
const router = Router();

const SECRET_KEY="key"
const TIMER=2000;

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username ||!email ||!password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserInfo({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    setTimeout(() => {
      res.json({ token,user,message:"success"});
    }, TIMER);
  } catch (error) {
    if(error.errorResponse?.errmsg?.includes("duplicate")){
      return setTimeout(() => {
        res.status(400).json({ error: "User already exists" });
      }, TIMER);
    }
    setTimeout(() => {
      res.status(500).json({ error: "Error registering user" });
    }, TIMER);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username ||!password) {
      return setTimeout(() => {
        res.status(400).json({ error: "Missing required fields" });
      }, TIMER);
    }
    const user = await UserInfo.findOne({ username });
    if (!user) {
      return setTimeout(() => {
        res.status(401).json({ error: "Invalid username or password" });
      }, TIMER);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return setTimeout(() => {
        res.status(401).json({ error: "Invalid username or password" });
      }, TIMER);
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    setTimeout(() => {
      res.json({ token,user,message:"success" });
    }, TIMER);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Error logging in" });
    }, TIMER);
  }
});


router.get('/user', async (req, res)=>{
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return setTimeout(() => {
        res.status(401).json({ error: 'User not found' });
      }, TIMER);
    }
    setTimeout(() => {
      res.json({ user });
    }, TIMER);
  } catch (error) {
     setTimeout(() => {
      res.status(401).json({ error: 'Invalid token' });
    }, TIMER);
  }
});

export default router;