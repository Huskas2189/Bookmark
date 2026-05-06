<script lang="ts">
  const iconUrl = "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/";
  const { icon, alt }: {
    icon: string,
    alt: string
  } = $props();

  function getUrl(): string {
    return iconUrl + icon + '.svg'
  }

</script>

<img src={getUrl()} alt={alt} />

<style>
    @reference '../style/_style.css';

    img {
        @apply h-12 w-auto;
    }
</style>