const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index'); 

const app = express();

app.use(express.json());

app.use(routes);


/**
 * Private route create
 * @route private
 */

app.get('/private', authenticate ,async (req,res)=>{
	console.log('I am user', req.use);
	return res.status(200).json({ message: 'Private Route' });
});



app.get('/', (_req, res) => {
	const obj = {
		name: 'debit',
		email: 'debit@example.com',
	};
	res.json(obj);
});


app.use((err, _req, res, _next) => {
	const message = err.message ? err.message : 'Server Error Occurred';
	const status = err.status ? err.status :500;
	console.log(err);
	res.status(status).json({ message});
});



connectDB('mongodb://127.0.0.1:27017/attendance-db')
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, () => {
			console.log("I'm listening on port 4000");
		});
	})
	.catch((e) => console.log(e));
