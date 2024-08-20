import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextAreaInput = ({ name, labelText, defaultValue }) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={
          defaultValue ||
          "Type something about your place that makes it special,unique and fun"
        }
        rows={5}
        className="leading-loose"
      />
    </div>
  );
};

export default TextAreaInput;
