import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    return(
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
            </div>
        </>
    )
}