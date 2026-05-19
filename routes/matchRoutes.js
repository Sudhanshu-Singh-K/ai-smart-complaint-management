const express = require("express");

const router = express.Router();

const Candidate = require("../models/Complaint");

router.post("/", async (req, res) => {

    try {

        const { requiredSkills, minExperience } = req.body;

        const candidates = await Candidate.find();

        const matchedCandidates = candidates.map(candidate => {

            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills.includes(skill)
            );

            const skillScore =
                matchedSkills.length / requiredSkills.length;

            const experienceScore =
                candidate.experience >= minExperience ? 1 : 0;

            const totalScore =
                (skillScore * 0.8) + (experienceScore * 0.2);

            return {
                name: candidate.name,
                email: candidate.email,
                skills: candidate.skills,
                experience: candidate.experience,
                matchedSkills,
                matchPercentage: (totalScore * 100).toFixed(2)
            };

        });

        matchedCandidates.sort(
            (a, b) => b.matchPercentage - a.matchPercentage
        );

        res.status(200).json(matchedCandidates);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;