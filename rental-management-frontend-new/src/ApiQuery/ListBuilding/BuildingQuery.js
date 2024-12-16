import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createBuilding, getBuilding ,deleteBuilding, updateBuilding,getTarget,updateTarget,buildingGetById} from "./BuildingUrls"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"

const useBuildingListQuery = (data) => {
    return useQuery({
        queryKey: ['getBuilding', data],
        queryFn: () => getBuilding(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const useBuildingCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createBuilding(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getBuilding')
            SuccessToast({message:"Building created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:"Somthing went wrong !"})
            return err
        },
    })
}

const useBuildingDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteBuilding(data),
        onSuccess: () => {
            query.invalidateQueries('getBuilding')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

const useBuildingUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateBuilding(data),
        onSuccess: async () => {
            query.invalidateQueries('getBuilding')
            SuccessToast({message:"Building updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.role_name?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useTargetListQuery = (data) => {
    return useQuery({
        queryKey: ['getTarget', data],
        queryFn: () => getTarget(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const useTargetUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateTarget(data),
        onSuccess: () => {
            query.invalidateQueries('getTarget')
            SuccessToast({ message: "Target updated successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}


const useBuildingGetByIdtQuery = (data) => {
    return useQuery({
        queryKey: ['getBuilding', data],
        queryFn: () => buildingGetById(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

export { useBuildingListQuery ,useBuildingCreateQuery,useBuildingDeleteQuery,useBuildingUpdateQuery,useTargetListQuery,useTargetUpdateQuery,useBuildingGetByIdtQuery}