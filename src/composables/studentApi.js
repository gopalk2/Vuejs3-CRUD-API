import {ref} from 'vue'
import axios from 'axios'

export default function useStudent(){
    const url = "http://localhost:3333/students/"
    const studentData = ref([])
    const error = ref(null)
    const statusCode = ref(null)
    const delError = ref(null)

    //Get All Students Data (Create function-always use)
    const getAllStudent = async () => {
        studentData.value = [] //reset
        error.value = null
        try {
            const res = await axios(url)  //res-response
            //console.log(res.data)
            studentData.value = res.data
        } catch (err) {
            //console.log(err)
            error.value = err
        }
    }

    // Get Single Student Data
    const getSingleStudent = async (id) => {
        studentData.value = []
        error.value = null
        try {
            const res = await axios(url + id)
            studentData.value = res.data
        } catch (err) {
            error.value = err
        }
    }

    // Post/Add Student Data
    const createStudent = async (formData) => {
        studentData.value = []
        error.value = null
        try {
            const config = { //object
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            }
            const res = await axios(config)
            // console.log(res)
            studentData.value = res.data
            statusCode.value = res.status
        } catch (err) {
            error.value = err
        }
    }

    // Update Student Data
    const updateStudent = async (id, data) => {
        studentData.value = []
        error.value = null
        try {
            const config = {
                method: 'PUT',
                url: url + id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }
            const res = await axios(config)
            studentData.value = res.data
            statusCode.value = res.status
        } catch (err) {
            error.value = err
        }
    }

    // Delete/destroy Student Data
    const destroyStudent = async (id) => {
        studentData.value = []
        error.value = null
        try {
            const config = {
                method: 'DELETE',
                url: url + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios(config)
            // console.log(res)
            statusCode.value = res.status
        } catch (err) {
            delError.value = err
        }
    }

    //return(call)
    return {
        studentData,
        error,
        statusCode,
        delError,
        getAllStudent,
        getSingleStudent,
        createStudent,
        updateStudent,
        destroyStudent
    }
}