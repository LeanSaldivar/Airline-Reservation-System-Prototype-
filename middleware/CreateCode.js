import RandExp from "randexp";

export const CreateCode = (req, res, next) => {
    try {
        const flightCodePattern = new RandExp(/[A-Z]{2}\d{3,4}/);
        req.flightCode = flightCodePattern.gen(); // Attach generated code to req
    } catch (e) {
        console.error("CreateCode Error:", e.message);
        return res.status(500).json({ msg: "Error generating flight code" });
    }
    next(); // Call the next middleware
};
