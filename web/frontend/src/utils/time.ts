export const time = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const remaining = Math.floor(duration % 60);

    return `${ minutes >= 10 ? minutes : '0' + minutes }:${ remaining >= 10 ? remaining : '0' + remaining }`;
}
