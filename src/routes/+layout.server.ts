import type {LayoutServerLoad} from './$types';
import { projectName, projectVersion } from '$lib/server/project';
import { getGlobalConfig } from '$lib/server/global-config';

export const load: LayoutServerLoad = async () => {
    return {
        title: getGlobalConfig().title,
        description: getGlobalConfig().description,
        projectName: projectName,
        projectVersion: projectVersion
    };
};
