const express = require('express');
const router = express.Router();
const db = require('./db');
const { verifyToken } = require('./jwt');

router.post('/newTicket', verifyToken, express.json(), async (req, res) => {
    const data = req.body;
  
    try {
        const sql = `INSERT INTO tickets (iduser, local, priority, task, comments) VALUES (?, ?, ?, ?, ?);`;
        const params = [data.iduser, data.local, data.priority, data.task, data.comments];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Erro ao criar o ticket, por favor tente novamente.` });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ success: true, result: `Ticket criado, aguarde o suporte iniciar o serviço.` });
            } else {
                return res.status(400).json({ success: false, result: `Erro ao criar o ticket, por favor tente novamente.` });
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, result: `Erro ao criar o ticket, por favor tente novamente.` });
    }
});

router.post('/getTickets', verifyToken, express.json(), async (req, res) => {
    try {
        const sql = `
        SELECT tickets.*, users.nickname
        FROM tickets
        INNER JOIN users ON tickets.iduser = users.iduser
        ORDER BY tickets.idtickets DESC;
        `;
        const params = [];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
            }

            if (results.length > 0) {
                return res.status(200).json({ success: true, result: `Tickets encontrados.`, tickets: results });
            } else {
                return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
    }
});

router.post('/getTicketsById', verifyToken, express.json(), async (req, res) => {
    const data = req.body;
    
    try {
        const sql = `
        SELECT tickets.*, users.nickname
        FROM tickets
        INNER JOIN users ON tickets.iduser = users.iduser
        WHERE idtickets = ?;
        `;
        const params = [data.idticket];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
            }

            if (results.length > 0) {
                return res.status(200).json({ success: true, result: `Tickets encontrados.`, tickets: results });
            } else {
                return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, result: `Erro ao buscar tickets, por favor tente novamente.` });
    }
});

router.post('/service', verifyToken, express.json(), async (req, res) => {
    const data = req.body;
    
    try {
        const sql = `
        UPDATE tickets SET status = 'Em progresso' WHERE (idtickets = ?);
        `;
        const params = [data.idticket];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ success: true, result: `Ticket atualizado.` });
            } else {
                return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
    }
});

router.post('/solution', verifyToken, express.json(), async (req, res) => {
    const data = req.body;
    
    try {
        const sql = `
        UPDATE tickets SET status = 'Fechado', solution = ?, closed_at = CURRENT_TIMESTAMP WHERE (idtickets = ?);
        `;
        const params = [data.solution, data.idticket];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({ success: true, result: `Ticket atualizado.` });
            } else {
                return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, result: `Erro ao atualizar o ticket, por favor tente novamente.` });
    }
});

module.exports = router;
