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
            // defaultValue="Sameer"
            required
          />
          <FormInput
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            // defaultValue="khan"
            required
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            // defaultValue="test123@gamil.com"
            required
          />
          <FormInput
            id="UserName"
            name="username"
            type="text"
            placeholder="UserName"
            // defaultValue="Sam123"
            required
          />
          <FormInput
            id="Password"
            name="password"
            type="password"
            placeholder="Password"
            // defaultValue="123456"
            required
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            // defaultValue="123456"
            required
          />
        </div>
        <SubmitButton text="Sign Up" btnsize="lg" className="mt-4 w-full" />
      </FormContainer>
    </div>
  );
};

export default RegisterProvider;
