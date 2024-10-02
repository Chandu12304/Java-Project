const express = require('express')
const { getStudents, getStudentByID, createStundent, updateStudent, deleteStudent } = require('../controlers/studentControler')

//routes object
const router = express.Router()

//routes

//GET ALL STUDENTS LIST || GET
router.get('/getall',getStudents);

//GET STUDENT BY ID || GET
router.get('/get/:id',getStudentByID)

// CREATE STUDENT || POST
router.post('/create',createStundent)

//UPDATE STUDENT || PUT
router.put('/update/:id',updateStudent)

//DELETE STUDENT || DELETE
router.delete('/delete/:id',deleteStudent)

module.exports = router