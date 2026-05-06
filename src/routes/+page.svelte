<script lang="ts">
    import type { PageProps } from './$types';
    import App from "$lib/components/App.svelte";

    let { data }: PageProps = $props();
</script>


<div class="bookmark-container">
    {#each Object.entries(data.config) as [key, app]}
        <App key={key} app={app} ></App>
    {/each}
</div>

<style>
    @reference '../style/_style.css';

    .bookmark-container {
        @apply flex grid-flow-col justify-center items-stretch;
        @apply gap-2;
        @apply mx-auto;
    }

</style>