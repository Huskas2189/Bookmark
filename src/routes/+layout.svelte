<script lang="ts">
	import '../style/_style.css';
	import favicon from '$lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>
    <h1>{ data.title }</h1>
</header>
<main>
    {@render children()}
</main>
<footer></footer>

<style>
    @reference '../style/_style.css';

    header {
        @apply fixed top-0 left-0 right-0;
        @apply flex justify-center items-center;
        /*@apply mx-auto my-auto;*/
        height: var(--header-height);

        @apply z-50;
        @apply shadow-lg;
        @apply backdrop-blur-lg;
        @apply bg-white/20;
    }

    main {
        @apply flex items-center;

        min-height: calc(100vh - var(--header-height));
    }

</style>