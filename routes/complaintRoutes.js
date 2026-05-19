const express = require("express");

const router = express.Router();

const Complaint = require("../models/Complaint");

const authMiddleware =
require("../middleware/authMiddleware");


// ADD COMPLAINT
router.post("/", async (req, res) => {

    try {

        const complaint =
            new Complaint(req.body);

        await complaint.save();

        res.status(201).json({
            message:
                "Complaint Added Successfully",
            complaint
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL COMPLAINTS
router.get("/", async (req, res) => {

    try {

        const complaints =
            await Complaint.find();

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE STATUS
router.put("/:id",
authMiddleware, async (req, res) => {

    try {

        const updatedComplaint =
            await Complaint.findByIdAndUpdate(

                req.params.id,

                {
                    status: req.body.status
                },

                {
                    new: true
                }

            );

        res.status(200).json(updatedComplaint);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// SEARCH BY LOCATION
router.get("/search", async (req, res) => {

    try {

        const complaints =
            await Complaint.find({

                location:
                    req.query.location

            });

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;