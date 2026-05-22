import http from 'node:http';
import type {RequestOptions} from 'node:http';

export type DockerContainer = {
    Id: string;
    Names: string[];
    Image: string;
    State: string;
    Status: string;
    Labels: Record<string, string>;
};

/**
 * Call the Docker socket API
 */
function dockerRequest<T>(path: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const options = {
            socketPath: '/var/run/docker.sock',
            path,
            method: 'GET'
        } as RequestOptions;

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);

                    resolve(parsed);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', reject);

        req.end();
    });
}

/**
 * Get all containers
 */
export async function getContainers(): Promise<DockerContainer[]> {
    return dockerRequest<DockerContainer[]>('/containers/json?all=true');
}
