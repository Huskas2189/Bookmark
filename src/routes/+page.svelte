<script lang="ts">
    import type { PageProps } from './$types';
    import App from '$lib/components/App.svelte';

    let { data }: PageProps = $props();
</script>

<div class="bookmark-container">
    {#each data.apps as app}
        <App {app}></App>
    {/each}
</div>

<style>
    @reference '../style/_style.css';

    .bookmark-container {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4;
        @apply place-content-center;
        @apply gap-4;
        @apply mx-auto;
    }
</style>
