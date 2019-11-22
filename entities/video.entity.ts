import { Exclude, Type } from 'class-transformer';
import { PlayerResponseEntity } from './playerResponse.entity';

export class VideoEntity {
    @Exclude() watermark!: [];

    @Exclude() fexp!: [];

    @Type(() => PlayerResponseEntity)
    player_response!: PlayerResponseEntity;

    @Exclude() fflags!: any;

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
}
