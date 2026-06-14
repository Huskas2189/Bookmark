<script lang="ts">
    import '../style/_style.css';
    import favicon from '$lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';
    import ThemeSelector from '$lib/components/ThemeSelector.svelte';
    import { applicableTheme } from '$lib/stores/theme.store';
    import { onMount } from 'svelte';
    import { browser } from '$app/env';

    let { data, children }: LayoutProps = $props();

    onMount(() => {
        if (!browser) return;
        applicableTheme.subscribe((mode) => {
            if (!browser) return;
            document.documentElement.setAttribute('data-theme', mode);
        });
    });
</script>

<svelte:head>
    <title>{data.title} - {data.projectName}</title>
    <link rel="icon" href={favicon} />
    <meta name="description" content={data.description} />
</svelte:head>

<header>
    <div class="title-container">
        <h1>{data.title}</h1>
        {#if data.description}
            <span class="description">{data.description}</span>
        {/if}
    </div>
    <div class="theme-selector">
        <ThemeSelector></ThemeSelector>
    </div>
</header>
<main>
    {@render children()}
</main>
<footer>
    Version: {data.projectVersion}
</footer>

<style lang="postcss">
    @reference '../style/_style.css';

    header {
        @apply layout-header;
        @apply shadow-lg;

        .title-container {
            @apply flex items-center;
            .description {
                @apply self-end;
            }
        }

        .theme-selector {
            @apply absolute right-4;
        }
    }

    main {
        @apply flex items-center;
        min-height: calc(100vh - calc(2 * var(--header-height)));
    }

    footer {
        @apply layout-footer;
        @apply inset-shadow-sm;
    }
</style>
