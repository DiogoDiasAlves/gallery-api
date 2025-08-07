// infra/http/presenters/list-users.presenter.ts
import { Image } from '@/core/entities/image';

export class ListImagePresenter {
    static toHTTP(image: Image[]) {
        return image.map(image => ({
            id_image: image.id,
            id_userame: image.nm_image,
            nm_image: image.nm_image,
            nm_stored: image.nm_stored,
            vl_size_kb : image.vl_size_kb,
            dt_created : image.dt_created
        }));
    }
}

