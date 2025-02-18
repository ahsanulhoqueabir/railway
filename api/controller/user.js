import  pool  from "../config/db.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await pool.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password])
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM user')
        return res.status(200).json(user[0])
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export  {
    createUser,
    getUser
}