export const saveData = (value) => {
    sessionStorage.setItem('trackActivity', JSON.stringify(value));
}

export const getData = () => {
    const data = JSON.parse(sessionStorage.getItem('trackActivity') || '{}');
    return data;
}
