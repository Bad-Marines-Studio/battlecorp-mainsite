interface AccountLoggedOutProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

export function AccountLoggedOut({
    onLoginClick,
    onRegisterClick,
}: AccountLoggedOutProps) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onLoginClick}
                className="text-sm font-medium hover:text-primary transition-colors"
            >
                Login
            </button>
            <span className="text-gray-300">|</span>
            <button
                onClick={onRegisterClick}
                className="text-sm font-medium hover:text-primary transition-colors"
            >
                Sign Up
            </button>
        </div>
    );
}
