import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { httpinstance,httpinstancefile, httpinstanceRate } from "../../axios/api"


export const get_dashboard_data = createAsyncThunk('get_dashboard_data', async (url)=>{
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

const dashboardSlice = createSlice({
    name : 'dashboard',
    initialState,
})
export default dashboardSlice.reducer