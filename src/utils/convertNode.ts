import { uniqid } from "./uniqid";

async function extract(node: any) {
    const {
        id,
        removed,
        isAsset
    }: any = node;
    const cssJson = await node.getCSSAsync();
    const unique_id = uniqid();
    const commonProperties = {
        nodeId: id,
        style: cssJson,
        id: unique_id,
    }
    if (removed) {
        return {
            ...commonProperties,
            type: 'null',

        }
    }
    if (isAsset) {
        return {
            ...commonProperties,
            type: 'img',
        }
    }

    switch (node.type) {

        case 'FRAME':
            return {
                ...commonProperties,
                type: 'div',

            }
        case 'RECTANGLE':
            return {
                ...commonProperties,
                type: 'div',
            }
        case 'INSTANCE':
            return {
                ...commonProperties,
                type: 'instance',
            }
        case 'Group':
            return {
                ...commonProperties,
                type: 'group',
            }
        case 'TEXT':
            return {
                ...commonProperties,
                type: 'text',
                text: node.characters
            }
        default:
            return {
                ...commonProperties,
                type: 'span',
            }
    }
}

// type === 'GROUP'
function groupConcat(node) {


    return node.children.reduce(())

}
export async function traverse(node: any) {
    if (node.children) {
        const data = await extract(node);
        const list = await Promise.all(node.children.map(async (item: any) => {
            return await traverse(item)
        }))
        return {
            ...data,
            child: list
        }
    } else {
        return await extract(node)
    }
}
