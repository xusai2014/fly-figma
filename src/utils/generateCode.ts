function generateTag(data:any) {
    const start = []
    const close = []
    const style = data.style;
    if(data.type === 'null') {
        start.push('')
        close.push('')
    } else if(data.type === 'img') {
        start.push(`<${data.type} class='${data.id}'>`)
        close.push('')
    }else if(data.type === 'text') {
        start.push(data.text)
        close.push('')
    } else if(data.type === 'group'){
        start.push('')
        close.push('')
        data.child =  [
            data.child.reduce((total:any, current:any)=>{
                return total.child.push(current);
            },{})
        ];

    } else {
        start.push(`<${data.type} class='${data.id}'>`)
        close.push('</' + data.type +'>')
    }
    if(data.child){
        const list = data.child.map((item:any) => generateTag(item))
        return {
            html: start.join('\n') + list.map(({html}:any)=>html).join('\n') + close.reverse().join('\n'),
            style: list.map(({style}:any)=>style).join('\n')
        }
    } else {
        return {
            html: start.join(' ') + close.reverse().join(' '),
            style: style && data.type !=='null'? `.${data.id}{${parseStyle(style)}}`: ''
        }
    }
}
function parseStyle(style:any) {
    return Object.keys(style).map((key) => {
        return `${key}:${style[key]};`
    }).join('')
}

export function generateCode(data:any) {
    const {
        html,
        style
    } = generateTag(data);
    return `<template>\n${html}\n</template><script>\n export default {name: 'Home',}\n</script><style scoped>\n${style}\n</style>`;
}
