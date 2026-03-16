const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');

const join_user_status = 'SELECT assets.*,IFNULL (users.user,"") AS user, IFNULL(status.status_name, "") AS status FROM assets  LEFT JOIN users ON assets.user_id = users.user_id LEFT JOIN status ON assets.status_id = status.status_id';

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

let conn;

const validateData = (userData) => {
    let errors = [];
    if (!userData.user) {
        errors.push('User is required');
    }
    if (!userData.password) {
        errors.push('Password is required');
    }
    return errors;
}

const validateAssets = (userData) => {
    let errors = [];
    if (!userData.asset_code) {
        errors.push('asset_code is required');
    }
    if (!userData.asset_name) {
        errors.push('asset_name is required');
    }
    if (!userData.category_id) {
        errors.push('category_id is required');
    }
    if (!userData.price) {
        errors.push('price is required');
    }
    if (!userData.description) {
        errors.push('description is required');
    }
    return errors;
}

const initMySQL = async () => {
    if (!conn) {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
        });
        console.log('connect to database');
    }
    return conn;
}

app.post('/login', async (req, res) => {
    try {
        const db = await initMySQL();
        const { user, password } = req.body;
        const [rows] = await db.query(
            'SELECT * FROM users WHERE user = ? AND password = ?', [user, password]
        );
        
        if (rows.length > 0) {
            const userRow = rows[0];
            console.log('userRow:', userRow); 
            const isAdmin = userRow.role == 1;
            const user_id = rows[0].user_id;
            res.json({
                status: "ok",
                isAdmin: isAdmin,
                user_id: user_id
            });
        } else {
            res.json({
                status: "error",
                message: "user or password incorrect"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

app.get('/borrow', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM assets WHERE status_id = 1');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/return', async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const user = req.query.user;
        const [rows] = await conn.query('SELECT * FROM assets WHERE status_id = 0 AND user_id = ?',user_id);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/assets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id } = req.body;
        await conn.query('UPDATE assets SET status_id = 0 , user_id = ? WHERE asset_id = ?', [user_id, id]);
        res.json({ 
            message: 'Updated successfully' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/assets', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM assets ');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/main', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT assets.*, categories.category_name FROM assets LEFT JOIN categories ON assets.category_id = categories.category_id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/assets',async (req, res) => {
    try{let assets = req.body;
        const errors = validateAssets(assets);
        if (errors.length > 0){
            throw {
                message: 'กรุณากรอกให้ครบ',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO assets SET ?', assets);
        console.log('results',results);
        res.json({
            message: 'บันทึกข้อมูลสำเร็จ',
            data: results[0]
        });
    }catch(error) {
        const errormessage = error.message || 'Error creating user';
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: errormessage,
            errors: error.errors || []
        });
    }
})

app.post('/register',async (req, res) => {
    try{let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0){
            throw {
                message: 'กรุณากรอกให้ครบ',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results',results);
        res.json({
            message: 'บันทึกข้อมูลสำเร็จ',
            data: results[0]
        });
    }catch(error) {
        const errormessage = error.message || 'Error creating user';
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: errormessage,
            errors: error.errors || []
        });
    }
})


app.get('/information', async (req, res) => {
    try {
        const [rows] = await conn.query(join_user_status);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/return/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await conn.query('UPDATE assets SET status_id = 1, user_id = NULL WHERE asset_id = ?', id);
        res.json({ 
            message: 'Updated successfully' 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/assets/:id', async (req, res) => {
    try {        const id = req.params.id;
        await conn.query('DELETE FROM assets WHERE asset_id = ?', id);
        res.json({ 
            message: 'Deleted successfully' 
        });
    }   catch (err) {               
        res.status(500).json({ error: err.message });       
    }
});

app.get("/assets/:id", async (req,res)=>{
    const id = req.params.id;
    const [rows] = await conn.query("SELECT * FROM assets WHERE asset_id = ?", [id]);
    res.json(rows[0])
})

app.put('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateAsset = req.body;
        const errors = validateAssets(updateAsset);
        if (errors.length > 0){
            throw {
                message: 'กรุณากรอกให้ครบ',
                errors: errors,
                statusCode: 400
            }
        }
        const results = await conn.query('UPDATE assets SET ? WHERE asset_id = ?', [updateAsset, id]);
        res.json({
            message: 'Asset updated successfully',
            data: results[0]
        });
    } catch (error) {
        console.error(error);
        const errormessage = error.message || 'Error updating asset';
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: errormessage,
            errors: error.errors || []
        });
    }
})

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}`);
});