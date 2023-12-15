import express from "express"
import mysql from "mysql"

const app = express()
const port = 3010


const db = mysql.createConnection({
	host: 'svc.sel5.cloudtype.app',
    port: 30773,
	user: 'root',
	password: 'mysql1234',
	database: 'PokemonStarting',
})

db.connect()


app.get('/', (req, res) => {
	res.send('20190622-손현락')
})

app.get('/pokemon', (req, res) => {
	const sql = `SELECT 
	P.PokemonName, 
	T.TypeName, 
	P.NextEvolutionID, 
	P.Height, 
	P.Weight,
	-- P.PokemonImageURL,
	G.GameName AS GameNames,
	-- G.GameImageURL AS GameURLs,
	R.Generation,
	R.RegionName,
	R.RegionDescription,
	R.RegionImageURL
	
	FROM Pokemon AS P 
	JOIN Type AS T ON P.TypeID = T.TypeID
	JOIN PokemonGame AS PG ON P.PokemonID = PG.PokemonID
	JOIN Game AS G ON PG.GameID = G.GameID
	JOIN RegionGame AS RG ON G.GameID = RG.GameID
	JOIN Region AS R ON RG.RegionID = R.RegionID`

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
