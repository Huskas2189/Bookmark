import type { LayoutServerData } from './$types';
import { projectName, projectVersion } from '$lib/server/project.ts';
import { getGlobalConfig } from '$lib/server/global-config.ts';

export const load: LayoutServerData = () => {
    return {
        title: getGlobalConfig().title,
        description: getGlobalConfig().description,
        projectName: projectName,
        projectVersion: projectVersion
    };
};
