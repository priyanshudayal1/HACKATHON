const getSuggestions = async (req, res) => {
  try {
    const { interests, budget, duration, travelers } = req.body;

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
      {
        name: "Manali, India",
        description: "Stunning mountain views and adventure activities",
        highlights: "Mountains, Adventure, Nature",
        costRange: "₹20,000 - ₹40,000",
        bestTime: "March to June",
        activities: [
          "Paragliding",
          "Trekking",
          "River rafting",
          "Visit Hadimba Temple"
        ]
      },
      {
        name: "Goa, India",
        description: "Beach paradise with vibrant nightlife and Portuguese culture",
        highlights: "Beaches, Nightlife, Water Sports",
        costRange: "₹15,000 - ₹35,000",
        bestTime: "November to February",
        activities: [
          "Beach hopping",
          "Water sports",
          "Casino visits",
          "Church tours"
        ]
      }
    ];

    res.status(200).json({
      success: true,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

module.exports = {
  getSuggestions
};
