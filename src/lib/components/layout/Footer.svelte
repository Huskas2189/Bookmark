<script lang="ts">
    import { page } from '$app/state';
</script>

<footer>
    Version: {page.data.projectVersion}
</footer>

<style lang="postcss">
    @reference '#style';

    footer {
        @apply layout-footer;
        @apply inset-shadow-sm;
    }
</style>
