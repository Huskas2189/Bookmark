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
<footer></footer>

<style>
    @reference '../style/_style.css';

    header {
        @apply fixed top-0 right-0 left-0;
        @apply flex items-center justify-center;
        height: var(--header-height);

        @apply z-50;
        @apply shadow-lg;
        @apply backdrop-blur-lg;
        @apply bg-white/20;

        .title-container {
            @apply flex items-center;
            .description {
                @apply self-end;
            }
        }
    }

    main {
        @apply flex items-center;

        min-height: calc(100vh - var(--header-height));
    }
</style>
