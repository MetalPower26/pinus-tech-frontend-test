import SignInForm from '@/app/components/authentication-forms/SignInForm';

export default function Home() {
    return (
        <div className="w-full bg-white font-[family-name:var(--font-geist-sans)] flex min-h-screen justify-center items-center flex-col gap-y-2">
            <SignInForm />
        </div>
    );
}
