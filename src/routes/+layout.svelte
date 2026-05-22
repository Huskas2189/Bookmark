<script lang="ts">
    import '../style/_style.css';
    import favicon from '$lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
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
</header>
<main>
    {@render children()}
</main>
<footer>
    Version: {data.projectVersion}
</footer>

<style>
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
