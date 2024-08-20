import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const FormInput = ({ label, name, type, defaultValue,placeholder }) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormInput;
