import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Submit";
import { createProfileAction } from "@/utils/action";

const CreateProfilePage = async () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Complete Profile</h1>
      <div className="border p-8 rounded-md ">
        <FormContainer action={createProfileAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              key="firstname"
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <FormInput
              key="lastname"
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
          </div>
          <SubmitButton text="Create Profile" btnSize="lg" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProfilePage;
