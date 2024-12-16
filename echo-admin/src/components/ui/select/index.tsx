import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";


export default function CustomeSelect({ placeholder, constant = false, options, onSelect }: any) {

    function handleSelect(value: string) {
        if (onSelect) {
            onSelect(value);
        }
    }
    
    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full h-12">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {
                    options?.map((item: any, index: number) => {
                        return (
                            <SelectItem key={index} value={item?.id}> {item?.label ||item?.name}</SelectItem>
                        )
                    })
                }
            </SelectContent>
        </Select>

    )
}
