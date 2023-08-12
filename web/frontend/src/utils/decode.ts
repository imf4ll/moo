export const decode = (s: string) => {
    s = s.replace('\\u0026', '&');
    s = s.replace('\\u003e', '>');
    s = s.replace('\\', '');

    return s;
}
