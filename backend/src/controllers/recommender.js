const pool = require("../db");

const recommender = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT 
        DISTINCT s.shoe_id, 
        s.brand, 
        s.model,
        sz.size_number,
        m.img_link  -- Include the img_link from the models table
      FROM 
        user_feet uf1
      JOIN 
        user_feet uf2 ON
          ABS(((uf1.foot_length_l + uf1.foot_length_r) / 2) - ((uf2.foot_length_l + uf2.foot_length_r) / 2)) <= 0.25
      JOIN
        user_shoes us ON us.user_id = uf2.user_id
      JOIN
        shoes s ON s.shoe_id = us.shoe_id
      JOIN
        sizes sz ON sz.size_id = s.size_id
      JOIN
        models m ON m.model = s.model  -- Join with the models table
      WHERE 
        uf1.user_id = $1 AND uf1.user_id != uf2.user_id
    `;
    const shoes = await pool.query(query, [user_id]);
    console.log(shoes);
    res.json(shoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  recommender,
};
