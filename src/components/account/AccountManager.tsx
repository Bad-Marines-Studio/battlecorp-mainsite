import { useAuth } from '@/hooks/useAuth';
import { AccountLoggedOut } from './AccountLoggedOut';
import { AccountLoggedIn } from './AccountLoggedIn';

interface AccountManagerProps {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
}

export function AccountManager({
    onLoginClick,
    onRegisterClick,
}: AccountManagerProps) {
    const { authenticated } = useAuth();

    if (authenticated) {
        return <AccountLoggedIn />;
    }

    return (
        <AccountLoggedOut
            onLoginClick={onLoginClick || (() => {})}
            onRegisterClick={onRegisterClick || (() => {})}
        />
    );
}
