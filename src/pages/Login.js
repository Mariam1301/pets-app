import Header from "../components/Header";
import Login from "../components/Login";

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
                <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                />
                <Login />
            </div>
        </>
    );
}
