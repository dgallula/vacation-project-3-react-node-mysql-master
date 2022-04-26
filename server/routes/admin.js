const { SQL } = require('../db/dbconfig')

const router = require('express').Router()


// Get all  for chart (vacations with the number of followers (NumberVacations) )
router.get('/follow', async (req, res) => {
    try {
        const vacationsnumber = await SQL(`SELECT vacations.* ,COUNT(follow.vacations_id) AS NumberVacations FROM follow
        LEFT JOIN vacations ON follow.vacations_id = vacations.id
        GROUP BY vacations.cityName
        ORDER BY vacations.id ASC`)
        res.send(vacationsnumber)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

/// Post new vacation
router.post('/', async (req, res) => {
    try {
        const { descriptions, country, cityName, price, img, dateFrom, dateUntil } = req.body

        const newVaca = await SQL(`INSERT into vacations(descriptions,country,cityName,price,img,dateFrom,dateUntil)
        VALUES ("${descriptions}","${country}","${cityName}",${price},"${img}","${dateFrom}","${dateUntil}")`)
        // console.log(newVaca.insertId);
        // await SQL(`INSERT into follow(user_id,vacations_id)
        // VALUES (2,${newVaca.insertId})`)

        res.send({ msg: "The vacations was post" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})


// Delete vacation
router.delete('/:id', async (req, res) => {
    try {

        await SQL(`DELETE FROM vacations WHERE id=${req.params.id};`);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})

// Upatde vacation
router.put('/', async (req, res) => {

    try {
        const { descriptions, id, img, cityName, country, dateFrom, dateUntil, price } = req.body


        if (!descriptions || !img || !cityName || !country || !dateFrom || !dateUntil || !price) {
            return res.status(400).send({ err: " Everything Is Requird" })
        }

        await SQL(`UPDATE vacations
        SET img = "${img}" , cityName = "${cityName}", country = "${country}" ,  descriptions = "${descriptions}", price = ${price}
        WHERE id = ${id};`)

        if (dateFrom) {
            await SQL(`UPDATE vacations
            SET  dateFrom = "${dateFrom}"
            WHERE id = ${id};`)
        }
        if (dateUntil) {
            await SQL(`UPDATE vacations
            SET  dateUntil = "${dateUntil}"
            WHERE id = ${id};`)
        }

        res.send({ msg: "you've changed the post" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }


})


module.exports = router