<script lang="ts">
    const iconUrl = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/';
    const {
        icon,
        alt
    }: {
        icon: string;
        alt: string;
    } = $props();

    function getUrl(): string {
        return iconUrl + icon + '.png';
    }
</script>

<img src={getUrl()} {alt} />

<style lang="postcss">
    @reference '#style';

    img {
        @apply h-8 w-auto;
    }
</style>
