import { handleSignupAction } from "@/lib/AuthAction";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Submit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const RegisterProvider = () => {
  return (
    <div className="gap-4 grid  items-center">
      <FormContainer action={handleSignupAction}>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FormInput
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            required
          />
          <FormInput
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <FormInput
            id="UserName"
            name="username"
            type="text"
            placeholder="UserName"
            required
          />
          <FormInput
            id="Password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <FormInput
            id="Confirm-Password"
            name="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <SubmitButton text="Sign Up" btnsize="lg" className="mt-4 w-full" />
      </FormContainer>
    </div>
  );
};

export default RegisterProvider;
