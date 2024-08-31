"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import FormContainer from "../form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "../form/Submit";
import { handleCredentialsLogin } from "@/lib/AuthAction";

const EmailProvider = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="gap-4 grid max-w-sm items-center ">
      <FormContainer action={handleCredentialsLogin}>
        {step === 0 && (
          <>
            <Label htmlFor="email" className="mx-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              className="outline-none "
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </>
        )}
        {step === 1 && (
          <>
            <input type="hidden" name="email" value={email} />
            <Label htmlFor="email" className="mx-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              className="outline-none "
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </>
        )}
        {step === 0 ? (
          <Button
            variant="default"
            disabled={!email}
            size="lg"
            className="w-full mt-4"
            type="button"
            onClick={() => setStep(1)}
          >
            Continue
          </Button>
        ) : (
          <SubmitButton
            text="Sign In"
            btnsize="lg"
            className="mt-4 w-full"
            onClick={() => setStep(0)}
          />
        )}
      </FormContainer>
    </div>
  );
};

export default EmailProvider;
