
import type { LayoutServerData } from './$types';
import {projectName, projectVersion} from "$lib/server/project.ts";
import {globalConfig} from "$lib/server/global-config.ts";

export const load: LayoutServerData = () => {
    return {
        title: globalConfig.title,
        description: globalConfig.description,
        projectName: projectName,
        projectVersion: projectVersion
    };
};
