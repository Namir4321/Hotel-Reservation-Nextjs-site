import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthProvider from "./AuthProvider";
import EmailProvider from "./EmailProvider";

const AuthCard = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="mt-2 font-bold">Sign in</CardTitle>
        <CardDescription>to login into your account</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 ">
        <AuthProvider />
       
      </CardContent>
      <CardContent>
        <EmailProvider />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          No account?<span className="text-blue-600"> Signup</span>{" "}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
