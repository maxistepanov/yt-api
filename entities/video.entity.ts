import {Exclude, Expose, Type} from 'class-transformer';
import { PlayerResponseEntity } from './playerResponse.entity';
import get from 'lodash.get';

export class VideoEntity {
    @Exclude() watermark!: [];

    @Exclude() fexp!: [];

    @Type(() => PlayerResponseEntity)
    player_response!: PlayerResponseEntity;

    @Exclude() fflags!: any;

    @Exclude() account_playback_token!: any;

    @Exclude() root_ve_type!: any;

    @Exclude() innertube_api_version!: any;

    @Exclude() fmt_list!: any;

    @Exclude() gapi_hint_params!: any;

    @Exclude() innertube_context_client_version!: any;

    @Exclude() c!: any;

    @Exclude() cver: any;

    @Exclude() enablecsi: any;

    @Exclude() csi_page_type: any;

    @Exclude() cr: any;

    @Exclude() html5player: any;

    @Exclude() full: any;

    @Exclude() innertube_api_key!: any;

    @Exclude() csn!: any;

    @Exclude() vss_host!: any;

    @Expose({ name: 'thumbnails' })
    getThumbnail() {
        const thumbs: any = [];

        try {
            const { thumbnails } = this.player_response.videoDetails.thumbnail;
            if (thumbnails && Array.isArray(thumbnails)) {
                thumbs.push(...thumbnails)
            }
        } catch (e) {

        }

        try {
            const { thumbnails = []  } = this.player_response.microformat.playerMicroformatRenderer.thumbnail;
            if (thumbnails && Array.isArray(thumbnails)) {
                thumbs.push(...thumbnails)
            }
        } catch (e) {

        }


        return thumbs
    }

}
