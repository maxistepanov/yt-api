import {Exclude, Expose, Type} from 'class-transformer';
import {PlayerResponseEntity} from './playerResponse.entity';
import {relatedVideo, videoInfo} from "ytdl-core";

export class VideoEntity implements videoInfo {
    age_restricted: boolean;
    no_embed_allowed?: boolean;
    video_url: string;
    related_videos: relatedVideo[];
    description: string;
    published: number;
    ad_flags: string;
    dbp: string;
    video_id: string;
    vmap: string;
    ptk: string;
    ad_logging_flag: string;
    midroll_freqcap: string;
    plid: string;
    ucid: string;
    allow_embed: string;
    mpvid: string;
    afv_instream_max: string;
    show_content_thumbnail: string;
    host_language: string;
    trueview: string;
    tmi: string;
    ad_preroll: string;
    iurlmaxres: string;
    iurlhq: string;
    iurlmq: string;
    iurlsd: string;
    thumbnail_url: string;
    allow_ratings: string;
    midroll_prefetch_size: string;
    length_seconds: string;
    fade_out_start_milliseconds: string;
    avg_rating: string;
    as_launched_in_country: string;
    ptchn: string;
    oid: string;
    cid: string;
    afv_ad_tag_restricted_to_instream: string;
    vm: string;
    probe_url: string;
    of: string;
    ad_tag: string;
    loudness: string;
    gpt_migration: string;
    ismb: string;
    dclk: string;
    shortform: string;
    loeid: string;
    aftv: string;
    excluded_ads: string;
    itct: string;
    ad_device: string;
    core_dbp: string;
    allow_html5_ads: string;
    instream_long: string;
    fade_out_duration_milliseconds: string;
    ad_slots: string;
    ppv_remarketing_url: string;
    no_get_video_log: string;
    tag_for_children_directed: string;
    encoded_ad_safety_reason: string;
    sfw_player_response: string;
    idpj: string;
    afv_ad_tag: string;
    status: string;
    apiary_host_firstparty: string;
    gut_tag: string;
    is_listed: string;
    hl: string;
    enabled_engage_types: string;
    author: { id: string; name: string; avatar: string; verified: boolean; user: string; channel_url: string; user_url: string; };
    media: { image?: string; category: string; category_url: string; game?: string; game_url?: string; year?: number; song?: string; artist?: string; artist_url?: string; writers?: string; licensed_by?: string; };
    pltype: string;
    ssl: string;
    fade_in_duration_milliseconds: string;
    apiary_host: string;
    cl: string;
    apply_fade_on_midrolls: string;
    title: string;
    atc: string;
    token: string;
    eventid: string;
    allow_below_the_player_companion: string;
    relative_loudness: string;
    ad3_module: string;
    timestamp: string;
    fade_in_start_milliseconds: string;
    t?: string;
    videostats_playback_base_url?: string;
    ldpj?: string;
    sffb?: string;
    player_error_log_fraction?: string;
    serialized_ad_ux_config?: string;
    storyboard_spec?: string;
    baseUrl?: string;
    focEnabled?: string;
    vid?: string;
    uid?: string;
    rmktEnabled?: string;
    iv3_module?: string;
    iv_invideo_url?: string;
    iv_endscreen_url?: string;
    iv_allow_in_place_switch?: string;
    iv_load_policy?: string;

    videoFormat: any;

    constructor(partial: Partial<any>) {
        Object.assign(this, partial);
    }

    @Exclude() watermark!: any;

    @Exclude() fexp!: any;

    @Type(() => PlayerResponseEntity)
    player_response: PlayerResponseEntity;

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

    formats: any;

    @Exclude() csi_page_type: any;

    @Exclude() cr: any;

    @Exclude() html5player: any;

    @Exclude() full: any;

    @Exclude() innertube_api_key!: any;

    @Exclude() csn!: any;

    @Exclude() vss_host!: any;

    @Expose({name: 'thumbnails'})
    getThumbnail() {
        const thumbs: any = [];

        try {
            const {thumbnails} = this.player_response.videoDetails.thumbnail;
            if (thumbnails && Array.isArray(thumbnails)) {
                thumbs.push(...thumbnails);
            }
        } catch (e) {
        }

        try {
            const {
                thumbnails = [],
            } = this.player_response.microformat.playerMicroformatRenderer.thumbnail;
            if (thumbnails && Array.isArray(thumbnails)) {
                thumbs.push(...thumbnails);
            }
        } catch (e) {
        }

        return thumbs;
    }
}
