const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();

        if (response.length === 0) {
            res.status(404).json({ msg: "No services found" });
            return;
        }

        return res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`services: ${error}`);
        res.status(500).json({ msg: "An error occurred while fetching services", error: error.message });
    }
};

module.exports = services;
