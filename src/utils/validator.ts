export const vkAlbumsLinkValidate = (link: string): boolean => {
    const spLinkRegex = RegExp("^https:\/\/vk.com\/albums-[0-9]+\/?$");
    return spLinkRegex.test(link);
};