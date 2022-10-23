const express = require('express');
const router = express.Router();
const memberBL = require('../models/memberBL');

router.get("/", async function (req, res) {
    try {
        const members = await memberBL.getAllMembers()
        console.log(members);
        res.status(200).json(members);
    } catch (err) {
        console.log("router", err);
        res.status(500).json({ msg: err })
    }
})

router.get("/:id", async function (req, res) {
    const id = req.params.id;
    try {
        const member = await memberBL.getMember(id);
        console.log(member)
        res.status(200).json(member);
    } catch (err) {
        console.log("router", err);
        res.status(500).json({ msg: err })
    }
})

router.post("/", async function (req, res) {
    const member = req.body;
    try {
        const status = await memberBL.addMember(member);
        console.log(status);
        res.status(200).json({ msg: status })
    } catch (err) {
        console.log("router", err);
        res.status(500).json({ msg: err })
    }
})
router.put("/:id", async function (req, res) {
    const id = req.params.id;
    const member = req.body;
    try {
        const status = await memberBL.updateMember(id, member);
        console.log(status);
        res.status(200).json({ msg: status })
    } catch (err) {
        console.log("router", err);
        res.status(500).json({ msg: err })
    }
})
router.delete("/:id", async function (req, res) {
    const id = req.params.id;
    try {
        const status = await memberBL.deleteMember(id);
        console.log(status);
        res.status(200).json({ msg: status })
    } catch (err) {
        console.log("router", err);
        res.status(500).json({ msg: err })
    }
})
module.exports = router;