import {getDescription, getTitle} from '$lib/server/config.ts';
import type { LayoutServerData } from './$types';
import {projectName} from "$lib/server/project.ts";

export const load: LayoutServerData = () => {
    return {
        title: getTitle(),
        description: getDescription(),
        projectName: projectName
    };
};
