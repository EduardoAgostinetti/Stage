const express = require('express');
const router = express.Router();
const db = require('./db');
const { generateToken } = require('./jwt');
const { validateFields, hashPassword, comparePassword, generateCode, sendMail } = require('./utility_functions');

router.post('/sign-up', express.json(), async (req, res) => {

    const data = req.body;

    const emptyField = validateFields(data);
    if (emptyField) {
        return res.status(400).json({ success: false, result: `O campo ${emptyField} deve ser preenchido.` });
    }

    if (data.password != data.confirmPassword) {
        return res.status(400).json({ success: false, result: "As senhas não coincidem." });
    }

    try {

        const queries = [
            { sql: "SELECT * FROM users WHERE email = ?", params: [data.email], result: `O e-mail ${data.email} já está registrado.` },
            { sql: "SELECT * FROM users WHERE username = ?", params: [data.username], result: `O nome de usuário ${data.username} já está registrado.` },
            { sql: "SELECT * FROM users WHERE nickname = ?", params: [data.nickname], result: `O apelido ${data.nickname} já está registrado.` }
        ];

        for (const query of queries) {
            const results = await new Promise((resolve, reject) => {
                db.query(query.sql, query.params, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            if (results.length > 0) {
                return res.status(400).json({ success: false, result: query.result });
            }
        }

        const hashedPassword = await hashPassword(data.password);
        const sqlRegister = "INSERT INTO users (nickname, username, email, password, isActive) VALUES (?, ?, ?, ?, 1)";
        const paramsRegister = [data.nickname, data.username, data.email, hashedPassword];

        const registerResults = await new Promise((resolve, reject) => {
            db.query(sqlRegister, paramsRegister, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (registerResults.affectedRows === 1) {
            return res.status(200).json({ success: true, result: `Usuário registrado com sucesso, acesse agora.` });
        } else {
            throw new Error("Falha no registro do usuário.");
        }
    } catch (error) {
        return res.status(500).json({ success: false, result: `Erro no servidor, tente novamente mais tarde. Erro: ${error.result}` });
    }
});

router.post('/sign-in', express.json(), async (req, res) => {
    const data = req.body;

    const emptyField = validateFields(data);
    if (emptyField) {
        return res.status(400).json({ success: false, result: `O campo ${emptyField} deve ser preenchido.`, field: emptyField });
    }

    try {
        const sql = "SELECT * FROM users WHERE username = BINARY ? OR email = BINARY ?;";
        const params = [data.username, data.username];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Usuário ${data.username} não encontrado.` });
            } else {

                if (results.length > 0) {

                    const user = results[0];
                    const passwordMatch = await comparePassword(data.password, user.password);
                    if (passwordMatch) {
                        if (user.isActive == 0) {
                            return res.status(400).json({ success: false, result: `Conta desativada, por favor ative sua conta para acessar.` });
                        } else {
                            const token = await generateToken(user);
                            return res.status(200).json({ success: true, result: `Acesso autorizado`, user: user, token: token });
                        }

                    } else {
                        return res.status(400).json({ success: false, result: `Senha inválida, tente novamente.` });
                    }

                } else {
                    return res.status(400).json({ success: false, result: `Usuário ${data.username} não encontrado.` });
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, result: `Ocorreu um erro.` });
    }
});

router.post('/sign-up-employee', express.json(), async (req, res) => {
    const data = req.body;

    const emptyField = validateFields(data);
    if (emptyField) {
        return res.status(400).json({ success: false, result: `O campo ${emptyField} deve ser preenchido.` });
    }

    if (data.password !== data.confirmPassword) {
        return res.status(400).json({ success: false, result: "As senhas não coincidem." });
    }

    try {
        const queries = [
            { sql: "SELECT * FROM users WHERE email = ?", params: [data.email], result: `O e-mail ${data.email} já está registrado.` },
            { sql: "SELECT * FROM users WHERE username = ?", params: [data.username], result: `O nome de usuário ${data.username} já está registrado.` },
            { sql: "SELECT * FROM users WHERE nickname = ?", params: [data.nickname], result: `O apelido ${data.nickname} já está registrado.` }
        ];

        for (const query of queries) {
            const results = await new Promise((resolve, reject) => {
                db.query(query.sql, query.params, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            if (results.length > 0) {
                return res.status(400).json({ success: false, result: query.result });
            }
        }

        const hashedPassword = await hashPassword(data.password);
        const sqlRegister = "INSERT INTO users (nickname, username, email, password, isActive, permission) VALUES (?, ?, ?, ?, 1, 1)";
        const paramsRegister = [data.nickname, data.username, data.email, hashedPassword];

        const registerResults = await new Promise((resolve, reject) => {
            db.query(sqlRegister, paramsRegister, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (registerResults.affectedRows === 1) {
            return res.status(200).json({ success: true, result: `Funcionário registrado com sucesso, acesse agora.` });
        } else {
            throw new Error("Falha no registro do funcionário.");
        }
    } catch (error) {
        return res.status(500).json({ success: false, result: `Erro no servidor, tente novamente mais tarde. Erro: ${error.result}` });
    }
});


router.post('/activeAccount', express.json(), async (req, res) => {
    const data = req.body;

    const emptyField = validateFields(data);
    if (emptyField) {
        return res.status(400).json({ success: false, result: `O campo ${emptyField} deve ser preenchido.`, field: emptyField });
    }

    try {
        const sql = `
            SELECT u.iduser, u.email, c.code, c.expired_at 
            FROM users u 
            JOIN codes c ON u.iduser = c.FK_iduser 
            WHERE u.email = ? AND c.code = ?;
        `;
        const params = [data.email, data.code];

        db.query(sql, params, async (error, results) => {
            if (error) {
                return res.status(400).json({ success: false, result: `Problema ao ativar a conta, verifique os dados e tente novamente.` });
            }

            if (results.length > 0) {
                const { expired_at } = results[0];

                if (new Date() > new Date(expired_at)) {
                    return res.status(400).json({ success: false, result: `O código expirou.` });
                }

                const updateSql = "UPDATE users SET isActive = 1 WHERE email = ?;";
                const updateParams = [data.email];
                db.query(updateSql, updateParams, (error, updateResults) => {
                    if (error) {
                        return res.status(400).json({ success: false, result: `Problema ao ativar a conta, verifique os dados e tente novamente.` });
                    }

                    if (updateResults.affectedRows > 0) {
                        return res.status(200).json({ success: true, result: `Conta ativada.` });
                    } else {
                        return res.status(400).json({ success: false, result: `Problema ao ativar a conta, verifique os dados e tente novamente.` });
                    }
                });

            } else {
                return res.status(400).json({ success: false, result: `Código ou e-mail inválido.` });
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, result: `Ocorreu um erro.` });
    }
});

router.post('/insertCode', express.json(), async (req, res) => {
    const data = req.body;
    const emptyField = validateFields(data);
    if (emptyField) {
        return res.status(400).json({ success: false, result: `O campo ${emptyField} deve ser preenchido.`, field: emptyField });
    }

    try {
        const userSql = "SELECT iduser FROM users WHERE email = ?";
        const userParams = [data.email];

        db.query(userSql, userParams, async (userError, userResults) => {
            if (userError || userResults.length === 0) {
                return res.status(400).json({ success: false, result: "Problema ao ativar a conta, verifique os dados e tente novamente." });
            }

            const iduser = userResults[0].iduser;

            const codeSql = "SELECT * FROM codes WHERE FK_iduser = ?";
            const codeParams = [iduser];

            db.query(codeSql, codeParams, async (codeError, codeResults) => {
                if (codeError) {
                    return res.status(400).json({ success: false, result: "Problema ao ativar a conta, verifique os dados e tente novamente." });
                }

                const code = generateCode(3);
                if (codeResults.length > 0) {
                    const updateSql = "UPDATE codes SET code = ? WHERE FK_iduser = ?";
                    const updateParams = [code, iduser];

                    db.query(updateSql, updateParams, async (updateError) => {
                        if (updateError) {
                            return res.status(400).json({ success: false, result: "Problema ao atualizar o código." });
                        }

                        try {
                            const subject = "CÓDIGO DE ATIVAÇÃO DE CONTA";
                            const text = `Código: ${code}`;
                            const html = `<h1>Código: ${code}</h1>`;
                            await sendMail(data.email, subject, text, html);
                            res.status(200).json({ success: true, result: "Código atualizado e e-mail enviado." });
                        } catch (sendMailError) {
                            res.status(500).json({ success: false, result: sendMailError });
                        }
                    });

                } else {
                    const insertSql = "INSERT INTO codes (FK_iduser, code) VALUES (?, ?)";
                    const insertParams = [iduser, code];

                    db.query(insertSql, insertParams, async (insertError) => {
                        if (insertError) {
                            return res.status(400).json({ success: false, result: "Problema ao inserir o código." });
                        }

                        try {
                            const subject = "CÓDIGO DE ATIVAÇÃO DE CONTA";
                            const text = `Código: ${code}`;
                            const html = `<h1>Código: ${code}</h1>`;
                            await sendMail(data.email, subject, text, html);
                            res.status(200).json({ success: true, result: "Código inserido e e-mail enviado." });
                        } catch (sendMailError) {
                            res.status(500).json({ success: false, result: sendMailError });
                        }
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, result: `Erro no servidor, tente novamente mais tarde. Erro: ${error.result}` });
    }
});

router.post('/forgotPassword', express.json(), async (req, res) => {
    const { email, password, confirmPassword, code } = req.body;
    const hashedPassword = await hashPassword(password);

    // Validate required fields
    if (!email || !password || !confirmPassword || !code) {
        return res.status(400).json({ success: false, result: "Todos os campos (email, nova senha, confirmação da senha, código) devem ser preenchidos." });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, result: "A senha e a confirmação da senha não coincidem." });
    }

    try {
        // Check if user exists
        const userSql = "SELECT iduser FROM users WHERE email = ?";
        const userParams = [email];

        db.query(userSql, userParams, async (userError, userResults) => {
            if (userError || userResults.length === 0) {
                return res.status(400).json({ success: false, result: "Usuário não encontrado com o e-mail fornecido." });
            }

            const iduser = userResults[0].iduser;

            // Check if code exists and matches
            const codeSql = "SELECT * FROM codes WHERE FK_iduser = ? AND code = ?";
            const codeParams = [iduser, code];

            db.query(codeSql, codeParams, async (codeError, codeResults) => {
                if (codeError || codeResults.length === 0) {
                    return res.status(400).json({ success: false, result: "Código inválido ou expirado." });
                }

                // Hash the new password before updating
                

                // Update the user's password
                const updatePasswordSql = "UPDATE users SET password = ? WHERE email = ?";
                const updatePasswordParams = [hashedPassword, email];

                db.query(updatePasswordSql, updatePasswordParams, (updateError) => {
                    if (updateError) {
                        return res.status(500).json({ success: false, result: "Erro ao atualizar a senha.", error: updateError });
                    }

                    res.status(200).json({ success: true, result: "Senha atualizada com sucesso." });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, result: `Erro no servidor, tente novamente mais tarde. Erro: ${error.result}` });
    }
});


module.exports = router;
