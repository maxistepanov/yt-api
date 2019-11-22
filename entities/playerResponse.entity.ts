import { Exclude } from 'class-transformer';

export class PlayerResponseEntity {
    @Exclude() playabilityStatus!: any;

    @Exclude() streamingData!: any;

    @Exclude() playerAds!: any;

    @Exclude() playbackTracking!: any;

    @Exclude() annotations!: any;

    @Exclude() playerConfig!: any;

    @Exclude() trackingParams!: any;

    @Exclude() attestation!: any;

    @Exclude() messages!: any;

    @Exclude() adPlacements!: any;

    @Exclude() storyboards!: any;

    microformat!: any;

    videoDetails!: any;

    @Exclude() adSafetyReason!: any;
}
