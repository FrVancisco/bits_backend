export const paths = {
    main: (version: string): string => `${version}/users`,
    getUserId: (version: string, id: string): string => `${paths.main(version)}/${id}`
}