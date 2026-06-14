import type { Target } from '$lib/models/app';

export type DefaultAttrs = {
    target?: Target;
};

export type BookmarkConfig = {
    title: string;
    description: string;
    defaultAttrs: DefaultAttrs;
};
