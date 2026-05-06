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
    img {
        height: 8rem;
        width: auto;
    }
</style>