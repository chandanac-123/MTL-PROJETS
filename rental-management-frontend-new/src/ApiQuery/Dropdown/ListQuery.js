import { getUserList, getPropertyTypeList, getStateList,getBankList,getPropertyList, getRentPropertyList, getExpenseTypeList ,getBuildingList} from "./ListUrl"
import { useQuery } from "@tanstack/react-query"

const useUserRole = (data) => {
    return useQuery({
        queryKey: ['getRole', data],
        queryFn: () => getUserList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const usePropertyTypeDropdown = (data) => {
    return useQuery({
        queryKey: ['getProperty', data],
        queryFn: () => getPropertyTypeList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useStateDropdown = (data) => {
    return useQuery({
        queryKey: ['getState', data],
        queryFn: () => getStateList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useBankDropdown = (data) => {
    return useQuery({
        queryKey: ['getBank', data],
        queryFn: () => getBankList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const usePropertyDropdown = (data) => {
    return useQuery({
        queryKey: ['getProp', data],
        queryFn: () => getPropertyList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const usePropertyRentDropdown = (data) => {
    return useQuery({
        queryKey: ['getRentProp', data],
        queryFn: () => getRentPropertyList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useExpenseTypeDropdown = (data) => {
    return useQuery({
        queryKey: ['getExpenseType', data],
        queryFn: () => getExpenseTypeList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

const useBuildingDropdown = (data) => {
    return useQuery({
        queryKey: ['getBuilding', data],
        queryFn: () => getBuildingList(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export { useUserRole, usePropertyTypeDropdown, useStateDropdown,useBankDropdown ,usePropertyDropdown, usePropertyRentDropdown,useExpenseTypeDropdown,useBuildingDropdown}