<script lang="ts">
  import type {App} from "$lib/models/config.ts";
  import Icon from "$lib/components/Icon.svelte";

  const uid = $props.id();
  const { app }: {
    app: App
  } = $props();
</script>

<article id="{app.id}-{uid}" class="bookmark">
    <Icon icon={app.icon ?? app.id} alt={app.name}></Icon>
    <h2>
        <a href={app.url} aria-label="Open {app.name}">
            { app.name }
        </a>
    </h2>
</article>

<style>
    @reference '../style/_style.css';

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
                content: "";
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