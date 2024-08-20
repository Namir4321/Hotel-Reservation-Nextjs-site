import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
const PriceInput = ({defaultValue}) => {
  const name = "price";
  
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue * 1 || 100 * 1}
        required
      />
    </div>
  );
};

export default PriceInput;
