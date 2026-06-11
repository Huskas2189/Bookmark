<script lang="ts">
    import type { App } from '$lib/models/app';
    import Icon from '$lib/components/Icon.svelte';
    import { page } from '$app/state';
    import type { DefaultAttrs } from '$lib/models/bookmark-config';

    const uid = $props.id();
    const {
        app
    }: {
        app: App;
    } = $props();

    const defaultAttrs = page.data.defaultAttrs as DefaultAttrs;
</script>

<article id="{app.id}-{uid}" class="bookmark">
    <Icon icon={app.icon ?? app.id} alt={app.name}></Icon>
    <h2>
        <a
            href={app.url}
            aria-label="Open {app.name}"
            rel="external norefferer"
            target={app.target ?? defaultAttrs.target ?? '_self'}
        >
            {app.name}
        </a>
    </h2>
</article>

<style lang="postcss">
    @reference '#style';

    article {
        @apply p-2;
        @apply w-full;
        @apply text-center;

        @apply card;

        @apply relative;
        @apply flex flex-col items-center;

        &:hover {
            @apply shadow-lg/20;
        }

        h2 {
            @apply p-2 pb-0;
        }

        a {
            &::after {
                content: '';
                position: absolute;
                inset: 0;
            }

            &:focus-visible {
                outline: 2px solid currentColor;
                outline-offset: 4px;
            }
        }
    }
</style>
