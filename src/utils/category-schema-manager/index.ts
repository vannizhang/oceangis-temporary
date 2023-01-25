import axios from 'axios';
// import { dateFns } from 'helper-toolkit-ts';

type getCategorySchemaProps = {
    agolGroupId: string;
    agolHost?: string;
};

export type CategorySchemaSubCategory = {
    title: string;
    categories: [];
};

export type CategorySchemaMainCategory = {
    title: string;
    categories: CategorySchemaSubCategory[];
};

export type CategorySchemaDataItem = {
    title: string;
    categories: CategorySchemaMainCategory[];
};

export type CategorySchemaJSON = {
    categorySchema: CategorySchemaDataItem[];
};

// get catgeory schema for an AGOL Group
export const getCategorySchema = async ({
    agolGroupId,
    agolHost = 'https://www.arcgis.com',
}: getCategorySchemaProps): Promise<CategorySchemaDataItem[]> => {
    if (!agolGroupId) {
        console.error('ArcGIS Online Group ID is missing');
        return;
    }

    try {
        const categorySchema = await fecthContentCategoryItem(
            agolGroupId,
            agolHost
        );
        return categorySchema;
    } catch (err) {
        console.error(err);
    }

    return null;
    // console.log('cached category schema is not found or has expired, download category schema');
};

const fecthContentCategoryItem = (
    agolGroupId: string,
    agolHost: string
): Promise<CategorySchemaDataItem[]> => {
    // const requestURL = agolHost + '/sharing/rest/content/items/' + categorySchemaItemID + '/data?f=json';

    const requestURL = `${agolHost}/sharing/rest/community/groups/${agolGroupId}/categorySchema?f=json`;

    return new Promise((resolve, reject) => {
        axios
            .get<CategorySchemaJSON>(requestURL)
            .then((res) => {
                if (res && res.data && res.data.categorySchema) {
                    resolve(res.data.categorySchema);
                } else {
                    reject('cannot donwload category schema');
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
