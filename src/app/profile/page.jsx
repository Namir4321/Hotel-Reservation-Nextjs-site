import { updateProfileAction,getProfile,updateProfileImageAction } from "@/utils/action"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import SubmitButton from "@/components/form/Submit";
import ImageInputContainer from "@/components/form/ImageInputContainer";
const ProfilePage = async() => {
  const profile=await getProfile();
    return (
      <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Profile</h1>
        <div className="border p-8 rounded-md ">
          <ImageInputContainer
            image={profile.profileImage}
            name={profile.username}
            action={updateProfileImageAction}
            text="update Profile Image"
          />

          <FormContainer action={updateProfileAction}>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <FormInput
                key="firstname"
                type="text"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                defaultValue={profile.firstName}
              />
              <FormInput
                key="lastname"
                type="text"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                defaultValue={profile.lastName}
              />
              <FormInput
                key="username"
                type="text"
                name="username"
                label="username"
                placeholder="username"
                defaultValue={profile.username}
              />
            </div>
            <SubmitButton text="Update Profile" className="mt-8" />
          </FormContainer>
        </div>
      </section>
    );
  }
  
  export default ProfilePage