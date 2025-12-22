const express = require('express')
const router = express.Router()
const { addPerson, getPeople,getPerson,updatePerson,deletePerson } = require('../controllers/people')

router.get('/', getPeople)
router.post('/', addPerson);
router.get('/:personID', getPerson);
router.put('/:personID', updatePerson)
router.delete('/:personID', deletePerson)

module.exports = router