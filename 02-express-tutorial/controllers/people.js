const { people } = require('../data')

const getPeople = ((req, res) => {
    res
        .status(200)
        .json({ success: true, data: people })
})

const addPerson = (req, res) => {
    const { name } = req.body;

    if (!name || name.trim().length === 0) {
        res.status(400).json({ success: false, message: "please provide a name." });
    } else {

        people.push({ id: people.length + 1, name: req.body.name });
        res.status(201).json({ success: true, name: req.body.name });
    }
}

const getPerson = ((req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.personID));

    if (!person) {
        return res.status(404).json({ success: false, message: 'Person not found!' });
    }

    res.status(200).json({success: true, person});
})

const updatePerson = ((req,res) =>{
    let person = people.find((p) => p.id === parseInt(req.params.personID));

    if (!person) {
        return res.status(404).json({ success: false, message: 'Person not found!' });
    }

    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).json({ success: false, message: 'Please provide a valid name.' });
    }

    person.name = req.body.name
    res.status(200).json({success: true, person});
})

const deletePerson = ((req, res) => {
    const personID = parseInt(req.params.personID);
    const personToDelete = people.find(p => p.id === personID);

    if (!personToDelete) {
        return res.status(404).json({ success: false, message: 'Person not found!' });
    }

    const updatedPeople = people.filter(p => p.id !== personID);

    people.length = 0;
    people.push(...updatedPeople);

    res.status(200).json({ success: true, person: personToDelete });
})

module.exports = { getPeople, addPerson, getPerson, updatePerson, deletePerson }