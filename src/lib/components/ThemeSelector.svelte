<script lang="ts">
    import { applicableTheme, type Theme, theme } from '$lib/stores/theme.store';

    const options = ['light', 'dark', 'system'] as Theme[];
    function onclick() {
        theme.set(nextTheme);
    }

    const nextTheme: Theme = $derived.by(() => {
        const index = options.indexOf($theme);
        return options[(index + 1) % options.length];
    });

    const currentThemeLabel = $derived(
        $theme === 'system' ? `${$theme} (${$applicableTheme})` : $theme
    );
</script>

<div>
    <button
        {onclick}
        type="button"
        aria-label={`Current theme: ${currentThemeLabel}. Switch to ${nextTheme}`}
    >
        {#if $theme === 'system'}
            <span class="icon-[mdi--sun-moon-stars]"></span>
        {:else if $applicableTheme === 'dark'}
            <span class="icon-[mdi--moon-and-stars]"></span>
        {:else}
            <span class="icon-[mdi--weather-sunny]"></span>
        {/if}
    </button>
</div>

<style lang="postcss">
    @reference '#style';
    button {
        @apply p-1;
        @apply flex items-center;
        @apply cursor-pointer;

        & > span {
            @apply w-3 h-3;
        }
    }
</style>
