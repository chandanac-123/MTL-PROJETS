import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserRole, createUserRole, getUserRoleId, updateUserRole, deleteUserRole } from "./UserRoleUrls";
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages";

const useUserRoleListQuery = (data) => {
    return useQuery({
        queryKey: ['getRole', data],
        queryFn: () => getUserRole(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const useUserRoleCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createUserRole(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getRole')
            SuccessToast({message:"User role created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.role_name?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useUserRoleIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleRole', data],
        queryFn: () => getUserRoleId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false

    })
}

const useUserRoleUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateUserRole(data),
        onSuccess: async () => {
            query.invalidateQueries('getRole')
            SuccessToast({message:"Role updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.role_name?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useUserRoleDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteUserRole(data),
        onSuccess: () => {
            query.invalidateQueries('getRole')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

export { useUserRoleListQuery, useUserRoleCreateQuery, useUserRoleIdQuery, useUserRoleUpdateQuery, useUserRoleDeleteQuery }