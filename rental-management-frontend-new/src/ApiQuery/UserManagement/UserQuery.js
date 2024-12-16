import { SuccessToast ,ErrorToast} from "../../Utils/AlertMessages"
import { createUser, deleteUser, getUser, getUserId, getUserProfile, updateUser, updateUserProfile } from "./UserUrl"
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query"

const useUserListQuery = (data) => {
    return useQuery({
        queryKey: ['getUser', data],
        queryFn: () => getUser(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const useUserCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createUser(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getUser')
            SuccessToast({message:"User created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.email?.[0]||err?.response?.data?.detail?.phone_number?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useUserIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleUser', data],
        queryFn: () => getUserId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

const useUserUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateUser(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getUser')
            SuccessToast({message:"User updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.email?.[0]||err?.response?.data?.detail?.phone_number?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useUserDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteUser(data),
        onSuccess: () => {
            query.invalidateQueries('getUser')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

const useUserProfileGetQuery = (data) => {
    return useQuery({
        queryKey: ['getUserProfile', data],
        queryFn: () => getUserProfile(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useProfileUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateUserProfile(data),
        onSuccess: () => {
            query.invalidateQueries('getUserProfile')
            SuccessToast({ message: "Updated successfully" })
        },
        onError: async (err) => {
            ErrorToast({message:err?.response?.data?.detail?.phone_number?.[0]})
            return err
        },
    })
}

export { useUserListQuery ,useUserCreateQuery,useUserIdQuery,useUserUpdateQuery,useUserDeleteQuery ,useUserProfileGetQuery,useProfileUpdateQuery}