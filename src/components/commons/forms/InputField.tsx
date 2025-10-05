import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const InputField = ({name,label,placeholder,type = 'text',register,error,validation,disabled,value} : FormInputProps) => {
  
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input 
         type={type}
         id={name}
         placeholder={placeholder}
         className={cn("form-input",{'opacity-50 cursor-not-allowed': disabled})}
         {...register(name, validation)}
         disabled={disabled}
         defaultValue={value}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
export default InputField  