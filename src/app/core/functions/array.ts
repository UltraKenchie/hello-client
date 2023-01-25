export function flatten<T>(input: unknown[], output: T[] = []): T[] {
    for (const value of input) {
        if (Array.isArray(value)) {
            flatten(value, output);
        } else {
            output.push(value as T);
        }
    }
    return output;
}
