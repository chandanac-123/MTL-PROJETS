import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProperty, getPropertyId, createProperty, updateProperty, deleteProperty ,deletePropertyFile} from "./PropertyUrls"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"
import { useNavigate } from "react-router-dom"

const usePropertyListQuery = (data) => {
    return useQuery({
        queryKey: ['getProp', data],
        queryFn: () => getProperty(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const usePropertyIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleProp'&&'getProp', data],
        queryFn: () => getPropertyId(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        enabled: data ? true : false

    })
}

const usePropertyCreateQuery = () => {
    const navigate=useNavigate()
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createProperty(data),
        onSuccess:  () => {
            SuccessToast({ message: "Property created successfully" })
            setTimeout(() => {
                // query.invalidateQueries('getProp')
                query.invalidateQueries({
                    queryKey: ['getProp'],
                    refetchType: 'all'
                })
            }, 200);
            navigate('/properties'); 
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.role_name?.[0] || "Somthing went wrong !" })
            return err
        },
    })
}

const usePropertyUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateProperty(data),
        onSuccess: async () => {
            query.invalidateQueries('getProp')
            SuccessToast({ message: "Property updated successfully" })
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.role_name?.[0] || "Somthing went wrong !" })
            return err
        },
    })
}

const usePropertyDeleteQuery = () => {
    const navigate=useNavigate()
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteProperty(data),
        onSuccess: () => {
            setTimeout(()=>{

                query.invalidateQueries('getProp')
            },100)
            SuccessToast({ message: "Deleted Successfully" })
            navigate('/properties')
        },
        onError: async (err) => {
            console.log('err: ', err);
            ErrorToast({ message: err?.response?.data?.detail?.data })
            return err
        },
    })
}

const usePropertyFileDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deletePropertyFile(data),
        onSuccess: () => {
            query.invalidateQueries('getProp')
        },
        onError: async (err) => {
            return err
        },
    })
}


export { usePropertyListQuery, usePropertyIdQuery, usePropertyCreateQuery, usePropertyUpdateQuery, usePropertyDeleteQuery ,usePropertyFileDeleteQuery}