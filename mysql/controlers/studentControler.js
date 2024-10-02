const db = require("../config/db") // requiring mysqlPool and changing its name to db

//GET ALL STUDENTS LIST
const getStudents = async (req, res) => {
    try {
        const data = await db.query(' SELECT * FROM students_db.students ')
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'All students record',
            totalStudents: data[0].length,
            data: data[0]
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in GET ALL Students API',
            err
        })
    }
}

//GET STUDENT by ID
const getStudentByID = async (req, res) => {
    try {
        const studentid = req.params.id
        if (!studentid) {
            return res.status(404).send({
                success: true,
                message: 'Invalid or provide student ID'
            })
        }
        const data = await db.query(`SELECT * FROM students WHERE id=?`, [studentid])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'no records found'
            })
        }
        res.status(200).send({
            success: true,
            studentDetails: data[0]
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in GET Student By ID API ',
            err
        })
    }
}

// CREATE STUDENT
const createStundent = async (req, res) => {
    try {
        const { name, roll_no, fees_in_k, class_, medium_ } = req.body
        if (!name || !roll_no || !fees_in_k || !class_ || !medium_) {
            return res.status(500).send({
                success: false,
                message: 'please provide all files'
            })
        }
        const data = await db.query(`INSERT INTO students (name,roll_no,fees_in_k,class_,medium_) VALUES(?,?,?,?,?)`, [name, roll_no, fees_in_k, class_, medium_])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error in INSERT Query'
            })
        }
        res.status(201).send({
            success: true,
            message: 'new student record created'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Create Student API',
            err
        })
    }
}

//UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const studentID = req.params.id
        if (!studentID) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or provide ID'
            })
        }
        const { name, roll_no, fees_in_k, class_, medium_ } = req.body
        const data = await db.query('UPDATE students SET name =? , roll_no =?,fees_in_k=?,class_=?,medium_=? WHERE id=?', [name, roll_no, fees_in_k, class_, medium_, studentID])
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in Update data'
            })
        }
        res.status(200).send({
            success: true,
            message: 'students details are updated'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Update Student API',
            err
        })
    }
}

//DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const studentID = req.params.id
        if (!studentID) {
            return res.status(404).send({
                success: false,
                message: 'please provide student ID or valid student ID '
            })
        }
        await db.query('DELETE FROM students WHERE id=?', [studentID])
        res.status(200).send({
            success: true,
            message: 'Sttudent Deleted Successfully'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send1({
            success: false,
            message: 'Error in Delete Student in API',
            err
        })
    }
}

module.exports = { getStudents, getStudentByID, createStundent, updateStudent, deleteStudent }