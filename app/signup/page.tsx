import SignUpForm from '@/app/components/authentication-forms/SignUpForm';
export default function SignUpPage() {
    return (
        <div className="w-full bg-white font-[family-name:var(--font-geist-sans)] flex min-h-screen justify-center items-center flex-col gap-y-2">
            <SignUpForm />
        </div>
    );
}
