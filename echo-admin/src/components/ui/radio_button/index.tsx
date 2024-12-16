import { RadioGroup, RadioGroupItem } from "./radio-group";

export default function RadioButton({ options, onChange ,defaultValue}: any) {
    return (
        <RadioGroup defaultValue={defaultValue} onValueChange={onChange}>
            <div className="flex items-center space-x-2 justify-center gap-2">
                {options.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={item.id} id={item.id} />
                        <label htmlFor={item.id}>{item.label}</label>
                    </div>
                ))}
            </div>
        </RadioGroup>

    )
}
