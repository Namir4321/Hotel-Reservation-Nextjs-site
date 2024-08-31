import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterProvider from "@/components/signup/RegisterProvider";
const AuthCard = () => {
  return (
    <div className="flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle className="mt-2 font-bold">Sign in</CardTitle>
          <CardDescription>to login into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterProvider />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            No account?<span className="text-blue-600"> Signup</span>{" "}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthCard;
