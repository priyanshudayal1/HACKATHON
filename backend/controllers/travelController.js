const getSuggestions = async (req, res) => {
  try {
    const { interests, budget, duration, travelers } = req.body;

    // Example response structure - Replace with actual AI/database logic
    const suggestions = [
      {
        name: "Bali, Indonesia",
        description: "Tropical paradise with rich culture and beautiful beaches",
        highlights: "Beaches, Temples, Culture",
        costRange: "₹50,000 - ₹1,00,000",
        bestTime: "April to October",
        activities: [
          "Visit ancient temples",
          "Surf at Kuta Beach",
          "Rice terrace trekking",
          "Traditional dance shows"
        ]
      },
      // Add more destination suggestions...
    ];

    res.status(200).json({
      success: true,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getSuggestions
};
