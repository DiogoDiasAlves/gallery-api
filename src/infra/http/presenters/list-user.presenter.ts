// infra/http/presenters/list-users.presenter.ts
import { User } from '@/core/entities/user';

export class ListUsersPresenter {
    static toHTTP(users: User[]) {
        return users.map(user => ({
            id: user.id,
            name: user.nm_user,
            login: user.nm_login,
            createdAt: user.createdAt
        }));
    }
}