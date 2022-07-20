
export const deleteAndBackspaceHandler = (key: any, action: Function) => {
    if (key.key == "Delete" || key.key == "Backspace") {
        action && action();
    }
};