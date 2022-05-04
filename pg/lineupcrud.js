const db = require('./index')

const text = 'INSERT INTO users(first_name, email) VALUES($1, $2) RETURNING *'
const values = ['brian', 'brian.m.carlson@gmail.com']

db
  .query(text, values)
  .then(res => {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  })
  .catch(e => console.error(e.stack))


/* All lineup related code, just trying to get app working rn.

const tableName = 'sova_lineups'

let createText = `
    INSERT INTO ${tableName}
    (source, map, location_revealed, bounce, charge)
    VALUES
    ($1, $2, $3, $4, $5)
    `

const testValues = [
    'https://media.discordapp.net/attachments/798000938337435650/970841343771443200/unknown.png?width=832&height=468',
    'Haven',
    'C-site',
    0,
    2
]

async function registerLineup(lineup) {
    const text = `
        INSERT INTO ${tableName}
        (source, map, location_revealed, bounce, charge)
        VALUES
        ($1, $2, $3, $4, $5)
    `
    const values = [lineup.source, lineup.map, lineup.location_revealed, lineup.bounce, lineup.charge];
    return db.query(text, values);
  }


// READ functionality
async function getLineup(lineupId) {
    const text = `SELECT * FROM sova_lineups WHERE id = $1`;
    const values = [lineupId];
    return db.query(text, values);
  }

(async () => {
    // Call registerLineup with dummy parameters which comes from the RETURNING clause.
    const registerResult = await registerLineup({
      source: "https://tracker.gg/valorant/guides/clips/sova-mid-dart-icebox-by-beingjake-69656b48",
      map: "Icebox",
      location_revealed: "5555555555",
      bounce: 29,
      charge: 0
    });
    const lineupId = registerResult.rows[0]["id"];
    console.log("Registered a lineup with id: " + lineupId);
  
    // Obtain the full lineup object from the database.
    const getLineupResult = await getLineup(lineupId);
    console.log(
      "Result of SELECT query for lineup '" +
        lineupId +
        "': " +
        JSON.stringify(getlineupResult.rows[0], null, "  ")
    );

    await db.end()

})

*/