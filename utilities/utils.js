import Client, {Config} from 'shopify-buy';

const SHOPIFY_TOKEN = '3c68bfc95783e266d19558d4fafe34f1';
const SHOPIFY_DOMAIN = 'more2life-foundation.myshopify.com';

const utils = {
    getShopifyClient: () => {
        const config = new Config({
            domain: SHOPIFY_DOMAIN,
            storefrontAccessToken: SHOPIFY_TOKEN
        });

        return new Client(config);
    },

    getActionButtonLabel: (type) => {
        const actionButtonLabels = {
            event: 'See More',
            story: 'See More',
            listing: 'Buy',
            donation: 'Donate'
        }
        return actionButtonLabels[type];
    },

    getDonationBucketId: () => {
        return 'donation';
    }

}

export default utils;
