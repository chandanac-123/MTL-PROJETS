import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { httpinstance,httpinstancefile, httpinstanceRate } from "../../axios/api"


export const get_verification_data = createAsyncThunk('get_verification_data', async (url)=>{
    try{
        const response = await httpinstance.get(url)
        return response
    }catch (err){
        return err.response
    }
})



const initialState = {
    data:{},
    loading:false,
}

const verificationSlice = createSlice({
    name : 'verification',
    initialState,
})
export default verificationSlice.reducer