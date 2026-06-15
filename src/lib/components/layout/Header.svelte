<script lang="ts">
    import ThemeSelector from '$lib/components/ThemeSelector.svelte';
    import { page } from '$app/state';
</script>

<header>
    <div class="title-container">
        <h1>{page.data.title}</h1>
        {#if page.data.description}
            <span class="description">{page.data.description}</span>
        {/if}
    </div>
    <div class="side-container">
        <p class="welcome-text">Hello {page.data.username}</p>
        <ThemeSelector />
    </div>
</header>

<style lang="postcss">
    @reference '#style';

    header {
        @apply layout-header;
        @apply shadow-lg;

        .title-container {
            @apply flex items-center;

            .description {
                @apply self-end;
            }
        }

        .side-container {
            @apply absolute right-4;
            @apply flex flex-row items-center;

            .welcome-text {
                @apply mr-2;
            }
        }
    }
</style>
