export function fixSlash(path, include = true)
{
    const regex = new RegExp('((?<=\\/)\\/|\\/$)', 'g');

    if (include) {
        path = path.replace('', '/')
    }

    path = path.replace(regex, '');

    return path;
}

export function addIfNotExistIn(addingList, storeList)
{
    const arr = addingList.filter(item => {
        return storeList.indexOf(item) === -1;
    });
    return storeList.concat(arr);
}