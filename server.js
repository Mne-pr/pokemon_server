import express from "express"
import mysql from "mysql"

const app = express()
const port = 3010


const db = mysql.createConnection({
	host: 'svc.sel5.cloudtype.app',
    port: 30773,
	user: 'root',
	password: 'mysql1234',
	database: 'pokedex',
})

db.connect()


app.get('/', (req, res) => {
	res.send('20190622-손현락')
})

app.get('/pokemon', (req, res) => {
	const sql = `
SELECT 
    P.pokemonName, 
    P.nextEvolutionID, 
    P.height, 
    P.weight, 
    P.description, 
    P.pokemonImageURL, 
    T.typeName, 
    T.typeImageURL
FROM 
    Pokemon P
JOIN 
    PokemonType PT ON P.pokemonID = PT.pokemonID
JOIN 
    Type T ON PT.typeID = T.typeID 
`
	db.query(sql,(err,rows) => {
		if(err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

	
app.listen(port, () => {
	console.log(`서버 실행됨 (port ${port})`)
})
