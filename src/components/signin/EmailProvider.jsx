import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

const EmailProvider = () => {
  return (
    <div className="gap-4 grid max-w-sm items-center ">
      <Label htmlFor="email" className="mx-2">Email</Label>
      <Input type="email"className="outline-none " id="email" placeholder="Email" />
    <Button variant="default" size="lg">Continue</Button>
    </div>
  );
};

export default EmailProvider;
