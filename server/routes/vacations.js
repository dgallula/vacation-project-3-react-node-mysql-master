const { SQL } = require('../db/dbconfig')
const { loggedUser } = require('../helper/loggedUser')


const router = require('express').Router()

//Get all vacations
router.get('/', async (req, res) => {
    try {
        const vacations = await SQL(`SELECT * FROM vacationsdb.vacations;`)
        res.send(vacations)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// Get all vacations followed by user_id 
router.get('/follow/:id',  async (req, res) => {
    try {
        const { id } = req.params

        const followvacations = await SQL(`SELECT vacations.* ,COUNT(follow.vacations_id) AS NumberVacations FROM follow
        LEFT JOIN vacations ON follow.vacations_id = vacations.id
        WHERE EXISTS (
        SELECT *
        FROM follow
        where vacations.id = follow.vacations_id AND follow.user_id = ${id})
        GROUP BY vacations.cityName`)
        res.send(followvacations)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// Get all vacations not followed by user_id 
router.get('/unfollow/:id',  async (req, res) => {
    try {
        const { id } = req.params

        const unfollowvacations = await SQL(`SELECT vacations.* ,COUNT(follow.vacations_id) AS NumberVacations FROM follow
        LEFT JOIN vacations ON follow.vacations_id = vacations.id
        WHERE NOT EXISTS (
        SELECT *
        FROM follow
        where vacations.id = follow.vacations_id AND follow.user_id = ${id})
        GROUP BY vacations.cityName`)

        res.send(unfollowvacations)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// The vacations no one follow
router.get('/unfollow', async (req, res) => {
    try {


        const nonfollow = await SQL(`SELECT * 
        FROM vacationsdb.vacations 
        WHERE NOT EXISTS(
        SELECT NULL
        FROM follow
        WHERE follow.vacations_id = vacations.id)`)
        res.send(nonfollow)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})



// Add a follow
router.post('/addfollow', async (req, res) => {
    try {
        const { user_id, vacations_id } = req.body

        const addfollow = await SQL(`INSERT into follow(user_id,vacations_id)
            VALUES ('${user_id}','${vacations_id}')`)

        res.send({ msg: "follow was update" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})

// Delete a follow
router.delete('/delfollow', async (req, res) => {
    try {
        const { user_id, vacations_id } = req.body

        await SQL(`DELETE FROM follow WHERE user_id=${user_id} AND vacations_id= ${vacations_id} `)

        res.send({ msg: "follow was deleted" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})




module.exports = router