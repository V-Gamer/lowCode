export function getComponentStyle(style){
    style = {...style}
    style.bottom = style.top+style.height;
    style.right = style.left+style.width;
    return style;
}